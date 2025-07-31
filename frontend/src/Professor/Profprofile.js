import React, { useState, useEffect } from 'react'

export default function Profprofile() {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Authorization token not found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                // This will fail until you create a corresponding backend route
                const response = await fetch("http://localhost:4000/professor/profile", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProfile(data.data);
            } catch (err) {
                console.error("Error fetching professor profile:", err);
                setError(`Failed to load profile: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="ma">
                <main style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem" }}>
                    <div className="profile-area">
                        <p>Loading profile...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ma">
                <main style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem" }}>
                    <div className="profile-area">
                        <p style={{ color: 'red' }}>Error: {error}</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!profile || Object.keys(profile).length === 0) {
        return (
            <div className="ma">
                <main style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem" }}>
                    <div className="profile-area">
                        <p>No profile data found.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="ma ">
            <main
                style={{
                    marginLeft: window.innerWidth < 768
                        ? "2.5rem"
                        : "11.5rem"
                }}
            >
                <div className="profile-area ">
                    <div className="avatar">
                        <span>👤</span>
                    </div>
                </div>
                <div className="profile-details ">
                    <p><strong>Name:</strong> <span>{profile.name}</span></p>
                    <p><strong>Institute Email:</strong> <span>{profile.email}</span></p>
                    <p><strong>Department:</strong> <span>{profile.dept}</span></p>
                </div>
            </main>
        </div>
    );
}