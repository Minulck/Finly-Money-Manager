import React, { useState, useContext, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Input from "../components/Input";
import UploadImage from "../components/UploadImage";
import { AppContext } from "../context/AppContext";
import { ValidateEmail, ValidatePassword } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import uploadProfileImage from "../util/uploadProfile";
import toast from "react-hot-toast";
import { LoaderCircle, Save, User, Mail, Lock, Camera } from "lucide-react";

const Settings = () => {
    const { user, setUser } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    
    // Profile form state
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [currentProfileImage, setCurrentProfileImage] = useState("");
    
    // Password form state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // Form errors
    const [profileError, setProfileError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setEmail(user.email || "");
            setCurrentProfileImage(user.profileImage || "");
        }
    }, [user]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileError("");

        // Validation
        if (!fullName.trim()) {
            setProfileError("Please enter your full name");
            setProfileLoading(false);
            return;
        }
        if (!ValidateEmail(email)) {
            setProfileError("Please enter a valid email");
            setProfileLoading(false);
            return;
        }

        try {
            let profileImageUrl = currentProfileImage;

            // Upload new profile image if selected
            if (profilePic) {
                const imageURL = await uploadProfileImage(profilePic);
                profileImageUrl = imageURL || currentProfileImage;
            }

            const response = await axiosConfig.put(`${API_ENDPOINTS.GET_USER_INFO}`, {
                fullName,
                email,
                profileImage: profileImageUrl
            });

            if (response.status === 200) {
                // Update user context with new data
                setUser({
                    ...user,
                    fullName,
                    email,
                    profileImage: profileImageUrl
                });
                setCurrentProfileImage(profileImageUrl);
                setProfilePic(null);
                toast.success("Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setProfileError(error.response?.data?.message || "Failed to update profile. Please try again.");
            toast.error("Failed to update profile");
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setPasswordLoading(true);
        setPasswordError("");

        // Validation
        if (!currentPassword.trim()) {
            setPasswordError("Please enter your current password");
            setPasswordLoading(false);
            return;
        }
        if (!ValidatePassword(newPassword)) {
            setPasswordError(
                "New password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character"
            );
            setPasswordLoading(false);
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match");
            setPasswordLoading(false);
            return;
        }

        try {
            const response = await axiosConfig.put(`${API_ENDPOINTS.GET_USER_INFO}/password`, {
                currentPassword,
                newPassword
            });

            if (response.status === 200) {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                toast.success("Password updated successfully!");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setPasswordError(error.response?.data?.message || "Failed to update password. Please check your current password and try again.");
            toast.error("Failed to update password");
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <Dashboard>
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your account preferences and security settings</p>
                </div>

                {/* Profile Settings Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="text-emerald-600" size={24} />
                        <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                        {/* Profile Image Section */}
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                {currentProfileImage && !profilePic ? (
                                    <img
                                        src={currentProfileImage}
                                        alt="Current Profile"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
                                    />
                                ) : (
                                    <UploadImage image={profilePic} setImage={setProfilePic} />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Camera size={16} />
                                <span>Click to update your profile picture</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input
                                label="Full Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                type="text"
                            />
                            <Input
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                type="email"
                            />
                        </div>

                        {profileError && (
                            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                                {profileError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={profileLoading}
                            className="block mx-auto flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {profileLoading ? (
                                <LoaderCircle className="animate-spin" size={18} />
                            ) : (
                                <Save size={18} />
                            )}
                            {profileLoading ? "Updating..." : "Update Profile"}
                        </button>
                    </form>
                </div>

                {/* Password and Account Information Grid */}
                <div className=" gap-8 mb-8">
                    {/* Password Settings Section */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="text-emerald-600" size={24} />
                            <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                        </div>

                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <div className="space-y-4">
                                <Input
                                    label="Current Password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter your current password"
                                    type="password"
                                />
                                <Input
                                    label="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                    type="password"
                                />
                                <Input
                                    label="Confirm New Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your new password"
                                    type="password"
                                />
                            </div>

                            {passwordError && (
                                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                                    {passwordError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={passwordLoading}
                                className="block mx-auto flex gap-2 px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {passwordLoading ? (
                                    <LoaderCircle className="animate-spin" size={18} />
                                ) : (
                                    <Lock size={18} />
                                )}
                                {passwordLoading ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default Settings;