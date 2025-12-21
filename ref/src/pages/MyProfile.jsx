import React, { useState } from 'react';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateProfile } from 'firebase/auth';
import { FaUser, FaEnvelope, FaImage, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const MyProfile = () => {
    const { user, updateUserProfile } = use(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        
        setLoading(true);
        updateProfile(user, {
            displayName: name,
            photoURL: photoURL
        })
        .then(() => {
            updateUserProfile().then(() => {
                toast.success('Profile updated successfully!');
                setIsEditing(false);
            });
        })
        .catch(err => {
            toast.error('Error updating profile: ' + err.message);
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <Toaster position="top-center" />
            <div className="max-w-xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-10">My Profile</h2>

                <div className="card-bg shadow-lg p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="avatar mb-4">
                            <div className="w-32 rounded-full ring ring-green-600 ring-offset-2">
                                <img src={user?.photoURL || 'https://via.placeholder.com/150'} alt="Profile" />
                            </div>
                        </div>
                    </div>

                    {!isEditing ? (
                        <>
                            <div className="space-y-6 text-center">
                                <div>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <FaUser className="text-green-600 text-xl" />
                                        <p className="text-gray-600 text-sm">Name</p>
                                    </div>
                                    <p className="text-xl font-semibold">{user?.displayName || 'Not set'}</p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <FaEnvelope className="text-green-600 text-xl" />
                                        <p className="text-gray-600 text-sm">Email</p>
                                    </div>
                                    <p className="text-lg">{user?.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-primary w-md mx-auto mt-8 flex items-center justify-center gap-2"
                            >
                                <FaEdit />
                                Update Profile
                            </button>
                        </>
                    ) : (
                        <form onSubmit={handleUpdateProfile}>
                            <div className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaUser className="text-green-600" />
                                            Name
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text flex items-center gap-2">
                                            <FaImage className="text-green-600" />
                                            Photo URL
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)}
                                        placeholder="Enter photo URL"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        type="submit"
                                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                                        disabled={loading}
                                    >
                                        {loading ? <span className="loading loading-spinner loading-sm"></span> : <><FaSave />Save Changes</>}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="btn-secondary flex-1 flex items-center justify-center gap-2"
                                    >
                                        <FaTimes />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
