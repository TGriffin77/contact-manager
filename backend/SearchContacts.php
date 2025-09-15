<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "root", "", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare(
    		"SELECT FirstName, LastName, Phone, Email 
     		FROM Contacts 
     		WHERE (FirstName LIKE ? OR LastName LIKE ? OR Phone LIKE ? OR Email LIKE ?) 
     		AND UserID=?"
		);

		$search = "%" . $inData["search"] . "%";
		$stmt->bind_param("ssssi", $search, $search, $search, $search, $inData["userId"]);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		$searchResults = [];

		while ($row = $result->fetch_assoc()) {
    		$searchResults[] = $row; // stores FirstName, LastName, Phone, Email, UserID
		}

		if (count($searchResults) === 0) {
			returnWithError("No Records Found");
		} else {
			returnWithInfo($searchResults);
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
			"results" => [],
			"error" => $err
		]);
	}
	
	function returnWithInfo($searchResults) {
		sendResultInfoAsJson([
			"results" => $searchResults,
			"error" => ""
		]);
	}
?>