import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './components/alert';
import Contact from './components/contact';

const urlBase = 'http://localhost:8888/LAMPAPI';
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

    const [searching, setSearching] = useState(false);
    const [adding, setAdding] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [currentContact, setCurrentContact] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
            navigate('/login'); 
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
                setSearchMessage(`Found ${jsonObject.results.length} contact(s)`);
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
            firstName: contact.FirstName,
            lastName: contact.LastName,
            phone: contact.Phone,
            email: contact.Email,
            id: contact.id
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
                    prevList.filter(c => c.ID !== contact.ID)
                );
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const saveUpdateContact = async (ID, FirstName, LastName, Email, Phone) => {
        const userData = readUserData();
        if (!userData) {
            setAddResult("You are not logged in.");
            return;
        }

        const jsonPayload = {
            userId: userData.id,
            id: ID,
            firstName: FirstName,
            lastName: LastName,
            phone: Phone,
            email: Email
        };

        console.log(jsonPayload);
        try {
            const response = await fetch(`${urlBase}/UpdateContacts.${extension}`, {
                method: 'POST',
                body: JSON.stringify(jsonPayload),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            console.log(response);
            const result = await response.json();
            

            if (result.success) {
                setAddResult("Contact updated successfully!");
                
                
            } else {
                alert(result.error);
            }
        } catch (err) {
            alert(err.message);
        }
    }

    const doLogout = () => {
        localStorage.clear();
        navigate('/'); //routes to login page
    };

    return (
        <>
            {showAlert && <Alert message={addResult || searchMessage} trigger={setShowAlert} />}
            <div className="contact-main">
                <div id="accessUIDiv">
                    <button type="button" className="buttons" onClick={doLogout}>
                        Log Out
                    </button>   
                    <span id="userName">Welcome back, {readUserData()?.firstName}</span>

                    <div id="function-buttons">
                        <button onClick={() => { setSearching(!searching); setAdding(false); }} className={`searchFunction ${searching ? 'active' : ''}`}>
                            <span className="material-symbols--search-rounded" />
                        </button>
                        <button onClick={() => { setAdding(!adding); setSearching(false); }} className={`addFunction ${adding ? 'active' : ''}`}>
                            <span className="material-symbols--add-2-rounded" />
                        </button>
                    </div>
                    <div id="function-inputs">
                        {!searching && !adding &&
                            <p id="userName">To get started, select either the search or add buttons above.</p>
                        }
                        {searching && 
                            <div>
                                <input
                                    type="text"
                                    placeholder="Search Contacts"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="buttons" onClick={doSearchContact}>
                                    Search
                                </button>
                                <p>{searchMessage}</p>
                            </div>
                        }

                        {adding && 
                            <div>
                                <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                                <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                <button className="buttons" onClick={() => {doAddContacts(); setShowAlert(true); setTimeout(() => {setShowAlert(false); setAddResult('')}, 3000);}}>
                                    Add Contact
                                </button>
                                
                            </div>
                        }
                    </div>
                </div>
                    <div className={`accessUIDiv2 ${contactList && contactList.length > 0 ? 'active' : ''}`}>
                        {contactList && contactList.length > 0 && 
                            <>
                                    {contactList.map((contact, index) => (
                                        <Contact 
                                            key={index} 
                                            contact={contact} 
                                            onEdit={saveUpdateContact} 
                                            onDelete={() => doDeleteContacts(contact)} 
                                        />
                                    ))}
                                        
                            </>
                        }
                    </div>
            </div>
        </>
    );
}

export default Contacts;