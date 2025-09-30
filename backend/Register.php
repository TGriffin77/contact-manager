<?php
header("Access-Control-Allow-Origin: https://cop4331-contact-manager.thomasgriffin.dev");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $login = $inData["login"];
    $password = $inData["password"];

	$conn = new mysqli("localhost", "user", "password", "COP4331");	
	if( $conn->connect_error )
	{	
		returnWithError( $conn->connect_error );
        exit();
	}

    $stmt_check = $conn->prepare("SELECT ID FROM Users WHERE Login = ?");
    $stmt_check->bind_param("s", $login);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();
        
    if ($result_check->num_rows > 0) {
        $stmt_check->close();
        returnWithError("Username already exists.");
        exit();
    } 
            
    $stmt_check->close();

    // If the login doesn't exist, insert into users table
    $stmt_insert = $conn->prepare("INSERT into Users (firstName, lastName, Login, Password) VALUES(?,?,?,?)");
    $stmt_insert->bind_param("ssss", $firstName, $lastName, $login, $password);
            
    if ($stmt_insert->execute()) 
    {
        returnWithSuccess("User successfully registered!");
    } 
    else 
    {
        returnWithError($stmt_insert->error);
    }
            
    $stmt_insert->close();
    $conn->close();
	
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

    function returnWithSuccess($message)
    {
        $retValue = '{"message":"' . $message . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
	
?>
