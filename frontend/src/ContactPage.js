import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const urlBase = 'http://localhost/LAMPAPI';
const extension = 'php';

function Contacts() {
    const [newContact, setNewContact] = useState('');
    const [addResult, setAddResult] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');
    const [contactList, setContactList] = useState([]);
    
    const navigate = useNavigate();

    // Check if the user is logged in when the component loads
    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
            navigate('/login'); // Redirect to login if no user data is found
        }
    }, [navigate]);

    // Function to retrieve user data from local storage
    const readUserData = () => {
        try {
            const userString = localStorage.getItem('user_data');
            return userString ? JSON.parse(userString) : null;
        } catch (e) {
            console.error("Failed to retrieve user data from local storage", e);
            return null;
        }
    };

    // Based on your code.js file, this function adds a new contact
    const doAddContact = async () => {
        const userData = readUserData();
        if (!userData) {
            setAddResult("You are not logged in.");
            return;
        }
        
        const userId = userData.id;

        setAddResult('');
        const tmp = { contact: newContact, userId: userId };
        const jsonPayload = JSON.stringify(tmp);
        const url = `${urlBase}/AddContact.${extension}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: jsonPayload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            await response.json();
            setAddResult("Contact has been added!");
            setNewContact(''); //clear the input field
        } catch (err) {
            setAddResult(err.message);
        }
    };

    const doSearchContact = async () => {
        const userData = readUserData();
        if (!userData) {
            setSearchResults("You are not logged in.");
            return;
        }
        
        const userId = userData.id;

        setSearchResults('');
        const tmp = { search: searchQuery, userId: userId };
        const jsonPayload = JSON.stringify(tmp);
        const url = `${urlBase}/SearchContacts.${extension}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: jsonPayload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            const jsonObject = await response.json();

            if (jsonObject.error) {
                setSearchResults(jsonObject.error);
                setContactList([]);
            } else {
                setSearchResults("Your contacts:");
                setContactList(jsonObject.results);
            }
        } catch (err) {
            setSearchResults(err.message);
            setContactList([]);
        }
    };

    const doLogout = () => {
        localStorage.clear();
        navigate('/'); //routes to login page
    };

    return (
        <div id="accessUIDiv">
            <div id="loggedInDiv">
                <span id="userName">Hello, {readUserData()?.firstName}</span><br />
                <button type="button" id="logoutButton" className="buttons" onClick={doLogout}>
                    Log Out
                </button>
            </div>
            <br />
            <input
                type="text"
                id="searchText"
                placeholder="Contact To Search For"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" id="searchContactButton" className="buttons" onClick={doSearchContact}>
                Search
            </button><br />
            <span id="contactSearchResult">{searchResults}</span>
            <p id="contactList">
                {contactList.map((contact, index) => (
                    <span key={index}>{contact}<br /></span>
                ))}
            </p><br /><br />
            <input
                type="text"
                id="contactText"
                placeholder="Contact To Add"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
            />
            <button type="button" id="addContactButton" className="buttons" onClick={doAddContact}>
                Add Contact
            </button><br />
            <span id="contactAddResult">{addResult}</span>
        </div>
    );
}

export default Contacts;