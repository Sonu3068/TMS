import React, { useState, useEffect } from 'react';

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
                // Ensure your backend server is running at http://localhost:4000
                const response = await fetch("http://localhost:4000/professor/profile", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    let errorMessage = `HTTP error! status: ${response.status}`;
                    try {
                        // Try to parse as JSON first
                        const errorData = await response.json();
                        errorMessage = errorData.message || JSON.stringify(errorData);
                    } catch (jsonError) {
                        // If JSON parsing fails, try to get the raw text
                        const textError = await response.text();
                        errorMessage = `Failed to parse error response. Raw response: "${textError.substring(0, 200)}..." (Status: ${response.status})`;
                    }
                    throw new Error(errorMessage);
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
            <div className="ma flex justify-center items-center min-h-screen bg-gray-100">
                <main className="w-full max-w-4xl p-4 md:p-8 bg-white rounded-lg shadow-lg">
                    <div className="profile-area text-center">
                        <p className="text-lg font-medium text-gray-700">Loading profile...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="ma flex justify-center items-center min-h-screen bg-gray-100">
                <main className="w-full max-w-4xl p-4 md:p-8 bg-white rounded-lg shadow-lg">
                    <div className="profile-area text-center">
                        <p className="text-lg font-medium text-red-600">Error: {error}</p>
                        <p className="text-sm text-gray-500 mt-2">Please check your backend server and network connection.</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!profile || Object.keys(profile).length === 0) {
        return (
            <div className="ma flex justify-center items-center min-h-screen bg-gray-100">
                <main className="w-full max-w-4xl p-4 md:p-8 bg-white rounded-lg shadow-lg">
                    <div className="profile-area text-center">
                        <p className="text-lg font-medium text-gray-700">No profile data found.</p>
                        <p className="text-sm text-gray-500 mt-2">This might happen if the profile is empty or not yet created.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="ma flex justify-center items-center min-h-screen bg-gray-100 font-inter">
            <main
                className="w-full max-w-4xl p-4 md:p-8 bg-white rounded-lg shadow-lg"
                style={{
                    marginLeft: window.innerWidth < 768
                        ? "0" // Adjusted for smaller screens to center
                        : "11.5rem"
                }}
            >
                <div className="profile-area flex flex-col items-center mb-6">
                    <div className="avatar bg-blue-500 text-white rounded-full w-24 h-24 flex items-center justify-center text-5xl font-bold shadow-md mb-4">
                        <span>👤</span>
                    </div>
                    <h2 className="text-3xl font-semibold text-gray-800 mb-2">Professor Profile</h2>
                    <p className="text-gray-600 text-center">Details about the professor.</p>
                </div>
                <div className="profile-details space-y-3">
                    <p className="text-lg text-gray-700">
                        <strong className="font-semibold text-gray-900">Name:</strong>{' '}
                        <span className="text-blue-700">{profile.name || 'N/A'}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong className="font-semibold text-gray-900">Institute Email:</strong>{' '}
                        <span className="text-blue-700">{profile.email || 'N/A'}</span>
                    </p>
                    <p className="text-lg text-gray-700">
                        <strong className="font-semibold text-gray-900">Department:</strong>{' '}
                        <span className="text-blue-700">{profile.dept || 'N/A'}</span>
                    </p>
                    {/* Add more profile fields as needed */}
                </div>
            </main>
        </div>
    );
}
