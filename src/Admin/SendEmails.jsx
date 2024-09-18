
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SendEmails = () => {
    const [loading, setLoading] = useState(false);

    const sendEmails = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5678/addregister/sendEmails');
            setLoading(false);
            Swal.fire({
                title: 'Success!',
                text: response.data,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            setLoading(false);
            Swal.fire({
                title: 'Error!',
                text: 'Error sending emails',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Send Offer Emails</h1>
            <button 
                onClick={sendEmails} 
                style={{ 
                    padding: '12px 24px', 
                    fontSize: '18px', 
                    color: '#fff', 
                    backgroundColor: '#007bff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease'
                }}
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send Emails'}
            </button>
        </div>
    );
};

export default SendEmails;
