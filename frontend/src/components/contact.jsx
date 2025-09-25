import React, { useState } from 'react';

export default function Contact({ contact, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState(contact);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(editedContact);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedContact(contact);
        setIsEditing(false);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="name"
                        value={editedContact.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        name="email"
                        value={editedContact.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="tel"
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
                    <div>{contact.FirstName + " " + contact.LastName}</div>
                    <div>{contact.Email}</div>
                    <div>{contact.Phone}</div>
                    <button onClick={handleEdit}>Edit</button>
                    <button
                                    onClick={() => {
                                        if (window.confirm(`Are you sure you want to delete ${contact.FirstName} ${contact.LastName}?`)) {
                                            onDelete(contact);
                                        }
                                    }}
                                >Delete</button>
                </div>
            )}
        </div>
    );
};