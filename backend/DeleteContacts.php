<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit();
}

	$inData = json_decode(file_get_contents('php://input'), true);
	
	$userId = $inData["userId"] ?? null;
    $firstName = $inData["firstName"] ?? null;
    $lastName = $inData["lastName"] ?? null;
	$phone = $inData["phone"] ?? null;
	$email = $inData["email"] ?? null;
    

	$conn = new mysqli("localhost", "root", "root", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE FROM Contacts WHERE UserId=? AND FirstName=? AND LastName=? AND Phone=? AND Email=?");
		$stmt->bind_param("issss", $userId, $firstName, $lastName, $phone, $email);
		if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
            returnWithSuccess("Contact was deleted!");
            } else {
                returnWithError("No matching contact found to delete.");
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
		echo json_encode($obj, JSON_UNESCAPED_UNICODE);
	}

	function returnWithError($err) {
        sendResultInfoAsJson([
            "success" => false,
            "error" => $err
        ]);
    }

    function returnWithSuccess($message) {
        sendResultInfoAsJson([
            "success" => true,
            "message" => $message
        ]);
    }
?>