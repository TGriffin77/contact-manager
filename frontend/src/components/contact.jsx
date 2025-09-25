import React, { useState } from 'react';

export default function Contact({ contact, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({
        firstName: contact.FirstName,
        lastName: contact.LastName,
        email: contact.Email,
        phone: contact.Phone
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleEdit = () => {
        setEditedContact({
            firstName: contact.FirstName,
            lastName: contact.LastName,
            email: contact.Email,
            phone: contact.Phone
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit({
            ...contact,
            FirstName: editedContact.firstName,
            LastName: editedContact.lastName,
            Email: editedContact.email,
            Phone: editedContact.phone
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContact({
            firstName: contact.FirstName,
            lastName: contact.LastName,
            email: contact.Email,
            phone: contact.Phone
        });
        setIsEditing(false);
    };

    return (
        <div className={`contactItem ${isEditing ? 'active' : ''}`}>
            {isEditing ? (
                <div>
                    <div id="nameParts">
                        <input
                            type="text"
                            name="firstName"
                            value={editedContact.firstName}
                            onChange={handleChange}
                            placeholder="First name"
                        />
                        <input
                            type="text"
                            name="lastName"
                            value={editedContact.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                    </div>
                    <input
                        type="text"
                        name="email"
                        value={editedContact.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        name="phone"
                        value={editedContact.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <div id="contactName">{contact.FirstName + " " + contact.LastName}</div>
                    <div id="contactEmail">{contact.Email}</div>
                    <div id="contactPhone">{contact.Phone}</div>
                </div>
            )}
            {!isEditing &&
                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button
                        onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${contact.FirstName} ${contact.LastName}?`)) {
                                onDelete(contact);
                            }
                        }}
                    >Delete</button>
                </div>}
        </div>
    );
};