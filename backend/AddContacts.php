<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	http_response_code(204);
    exit(0);
}

	$inData = json_decode(file_get_contents('php://input'), true);

	if (!$inData) {
		returnWithError("Invalid JSON input");
		exit();
	}
	
	$userId = $inData["userId"] ?? null;
	$firstName = $inData["firstName"] ?? null;
	$lastName = $inData["lastName"] ?? null;
	$phone = $inData["phone"] ?? null;
	$email = $inData["email"] ?? null;

	if (!$userId || !$firstName || !$lastName || !$phone || !$email) {
		returnWithError("All fields are required.");
		exit();
	}

	$conn = new mysqli("localhost", "root", "", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
		exit();
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (UserId,FirstName, LastName, Phone, Email) VALUES(?, ?, ?, ?, ?)");
		$stmt->bind_param("issss", $userId, $firstName, $lastName, $phone, $email);
		if ($stmt->execute()) {
    		returnWithSuccess("Contact added successfully");
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
	
	function returnWithError( $err )
	{
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