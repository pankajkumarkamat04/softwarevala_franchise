import React from 'react'

const ContactFormDataPopup = ({ isOpen, onClose, fData }) => {
    if (!isOpen) return null;
    return (
        <div className={`popup-overlay ${isOpen ? "active" : ""}`}>
            <div className="popup">
                <p>Name : {fData.name}</p>
                <p>Email : {fData.email}</p>
                <p>Phone No : {fData.phoneNo}</p>
                <p>Message : {fData.message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ContactFormDataPopup