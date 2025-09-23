import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const urlBase = 'http://localhost/LAMPAPI';
const extension = 'php';

function Contacts() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [addResult, setAddResult] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchMessage, setSearchMessage] = useState('');
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
    const doAddContacts = async () => {
        const userData = readUserData();
        if (!userData) {
            setAddResult("You are not logged in.");
            return;
        }
        
        const jsonPayload = {
            userId: userData.id,
            firstName,
            lastName,
            phone: phone.replace(/[-\(\)]/g, ""),
            email
        };

        try {
            const response = await fetch(`${urlBase}/AddContacts.${extension}`, {
                method: 'POST',
                body: JSON.stringify(jsonPayload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            const result = await response.json();

            if (result.success) {
                setAddResult("Contact has been added!");
                // clear input fields
                setFirstName('');
                setLastName('');
                setPhone('');
                setEmail('');
            } else {
                setAddResult(result.error || "Failed to add contact.");
            }
        } catch (err) {
            setAddResult(err.message);
        }
    };

    const doSearchContact = async () => {
        const userData = readUserData();
        if (!userData) {
            setSearchMessage("You are not logged in.");
            return;
        }
        
        const userId = userData.id;

        setSearchMessage('');
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
                setSearchMessage(jsonObject.error);
                setContactList([]);
            } else {
                setSearchMessage(`Found ${jsonObject.results.length} contact(s):`);
                setContactList(jsonObject.results);
            }
        } catch (err) {
            setSearchMessage(err.message);
            setContactList([]);
        }
    };

    const doDeleteContacts = async (contact) => {
        const userData = readUserData();
        if (!userData) {
            setAddResult("You are not logged in.");
            return;
        }
        
        const jsonPayload = {
            userId: userData.id,
            firstName: contact.firstName,
            lastName: contact.lastName
        };

        try {
            const response = await fetch(`${urlBase}/DeleteContacts.${extension}`, {
                method: 'POST',
                body: JSON.stringify(jsonPayload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            const result = await response.json();

            if (result.success) {
                alert(result.message);

                setContactList(prevList =>
                    prevList.filter(
                        contact => !(contact.FirstName === firstName && contact.LastName === lastName)
                    )
                );
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert(err.message);
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
            <button type="button" className="buttons" onClick={doLogout}>
                Log Out
            </button>
        </div>

        <hr />

        <input
            type="text"
            placeholder="Search Contacts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="buttons" onClick={doSearchContact}>
            Search
        </button>

        <div>
            <p>{searchMessage}</p>
            <div id="contactList">
            {contactList.map((contact, index) => (
                <div key={index} className="contactItem">
                <strong>{contact.FirstName} {contact.LastName}</strong><br />
                Phone: {contact.Phone}<br />
                Email: {contact.Email}<br /><br />
                <button
                    onClick={() => {
                        if (window.confirm(`Are you sure you want to delete ${contact.FirstName} ${contact.LastName}?`)) {
                            doDeleteContacts(contact);
                        }
                    }}
                >
                    Delete
                </button>
                <br /><br />
                </div>
            ))}
            </div>
        </div>

        <hr />

        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
        <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button className="buttons" onClick={doAddContacts}>
            Add Contact
        </button>
        <div>
            <p>{addResult}</p>
        </div>
        </div>
    );
}

export default Contacts;