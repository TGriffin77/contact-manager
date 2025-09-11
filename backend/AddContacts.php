<!-- FirstName, LastName, Phone, Email, UserID -->

<?php
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
        $check = $conn->prepare("SELECT userId FROM Contacts WHERE firstName = ? AND lastName = ? AND userId = ?");
        $check->bind_param("ssi", $firstName, $lastName, $userId);
        $check->execute();
        $check->store_result();

        if($check->num_rows > 0) {
            echo("Contact already exists for this user.");
        }
        else {
            $stmt = $conn->prepare("INSERT into Contacts (UserId,FirstName, LastName, Phone, Email) VALUES(?, ?, ?, ?, ?)");
            $stmt->bind_param("issss", $userId, $firstName, $lastName, $phone, $email);
            $stmt->execute();
            $stmt->close();
            $conn->close();
            returnWithError("");
        }
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>