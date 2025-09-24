import React from 'react';

export default function Alert({ message, trigger }) {
    if (!message) return null;

    return (
        <div className="alert-container">
            <div className="alert">
                <span>{message}</span>
                <button className="alert-close" onClick={
                    () => trigger(false)
                }>✕</button>
            </div>
        </div>
    );
}