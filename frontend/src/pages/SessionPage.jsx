import React, { useState } from 'react';
import axios from 'axios';

const SessionPage = () => {
    const [teacherId, setTeacherId] = useState('');
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [status, setStatus] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [subject, setSubject] = useState('');
    const [sessionPrice, setSessionPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const teacherName = `${user.firstName} ${user.lastName}`;
        const students = [];

        try {
            const response = await axios.post('http://localhost:3001/sessions', {
                teacher: teacherId,
                teacherName,
                students,
                startTime,
                endTime,
                status,
                paymentStatus,
                subject,
                sessionPrice,
            });

            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Session Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Teacher ID:
                    <input
                        type="text"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    First Name:
                    <input
                        type="text"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Start Time:
                    <input
                        type="text"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    End Time:
                    <input
                        type="text"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Status:
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Payment Status:
                    <input
                        type="text"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Subject:
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Session Price:
                    <input
                        type="text"
                        value={sessionPrice}
                        onChange={(e) => setSessionPrice(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SessionPage;
