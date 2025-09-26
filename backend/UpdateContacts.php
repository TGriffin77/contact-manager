<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$id = $inData["id"];

	$conn = new mysqli("localhost", "root", "root", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("UPDATE Contacts SET firstName = ?, lastName = ?, phone = ?, email = ? WHERE userId = ? AND ID = ?");
		$stmt->bind_param("ssssii", $firstName, $lastName, $phone, $email, $userId, $id);
		if ($stmt->execute()) {
			if ($stmt->affected_rows > 0) {
				returnWithSuccess("Contact updated!");
			} else {
				returnWithError("No matching contact found to update or no changes were made.");
			}
    	} else {
            returnWithError($stmt->error);
        }

		$stmt->close();
		$conn->close();	
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo json_encode($obj);
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithSuccess($message) {
        sendResultInfoAsJson([
            "success" => true,
            "message" => $message
        ]);
    }
?>