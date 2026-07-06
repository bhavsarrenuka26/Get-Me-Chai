"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { CldUploadWidget } from 'next-cloudinary';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({
        name: "",
        email: "",
        username: "",
        profilepic: "",
        coverpic: "",
        razorpayid: "",
        razorpaysecret: ""
    })

    // Eye-toggle visibility
    const [showRazorpayId, setShowRazorpayId] = useState(false)
    const [showRazorpaySecret, setShowRazorpaySecret] = useState(false)

    useEffect(() => {
        if (!session) {
            router.push('/login')
        }
        else {
            getData()
        }
    }, [])

    const getData = async () => {
        let u = await fetchuser(session.user.name)
        setform(u)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name)
        toast('Profile Updated', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const EyeToggleButton = ({ visible, onClick, label }) => (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
        >
            {visible ? (
                // Eye-off icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )}
        </button>
    )

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="container mx-auto py-6 px-4 sm:px-6 max-w-2xl">
                <h1 className="text-center mb-6 text-2xl sm:text-3xl font-bold">Welcome to your Dashboard</h1>

                <form className="w-full" action={handleSubmit}>

                    <div className="my-3">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input
                            value={form.name ? form.name : ""}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="my-3">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            value={form.email ? form.email : ""}
                            onChange={handleChange}
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="my-3">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input
                            value={form.username ? form.username : ""}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    {/* Profile Picture Upload using Cloudinary */}
                    <div className="my-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>

                        {form.profilepic && (
                            <img src={form.profilepic} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover mb-3 border border-gray-600" />
                        )}

                        <input type="hidden" name="profilepic" value={form.profilepic ? form.profilepic : ""} />

                        <CldUploadWidget
                            uploadPreset="Get-me-chai"
                            onSuccess={(result) => {
                                setform(prev => ({ ...prev, profilepic: result.info.secure_url }));
                                toast.success("Profile picture uploaded!", { theme: "dark" });
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            open();
                                        }}
                                        className="w-full sm:w-auto bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 border border-gray-600 transition-colors"
                                    >
                                        Upload Profile Picture
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>

                    {/* Cover Picture Upload using Cloudinary */}
                    <div className="my-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>

                        {form.coverpic && (
                            <img src={form.coverpic} alt="Cover Preview" className="w-full h-28 sm:h-32 object-cover rounded-lg mb-3 border border-gray-600" />
                        )}

                        <input type="hidden" name="coverpic" value={form.coverpic ? form.coverpic : ""} />

                        <CldUploadWidget
                            uploadPreset="Get-me-chai"
                            onSuccess={(result) => {
                                setform(prev => ({ ...prev, coverpic: result.info.secure_url }));
                                toast.success("Cover picture uploaded!", { theme: "dark" });
                            }}
                        >
                            {({ open }) => {
                                return (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            open();
                                        }}
                                        className="w-full sm:w-auto bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 border border-gray-600 transition-colors"
                                    >
                                        Upload Cover Picture
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>

                    {/* Razorpay Id */}
                    <div className="my-3">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <div className="relative">
                            <input
                                value={form.razorpayid ? form.razorpayid : ""}
                                onChange={handleChange}
                                type={showRazorpayId ? "text" : "password"}
                                name="razorpayid"
                                id="razorpayid"
                                className="block w-full p-2.5 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <EyeToggleButton
                                visible={showRazorpayId}
                                onClick={() => setShowRazorpayId(!showRazorpayId)}
                                label={showRazorpayId ? "Hide Razorpay Id" : "Show Razorpay Id"}
                            />
                        </div>
                    </div>

                    {/* Razorpay Secret  */}
                    <div className="my-3">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <div className="relative">
                            <input
                                value={form.razorpaysecret ? form.razorpaysecret : ""}
                                onChange={handleChange}
                                type={showRazorpaySecret ? "text" : "password"}
                                name="razorpaysecret"
                                id="razorpaysecret"
                                className="block w-full p-2.5 pr-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <EyeToggleButton
                                visible={showRazorpaySecret}
                                onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                                label={showRazorpaySecret ? "Hide Razorpay Secret" : "Show Razorpay Secret"}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none dark:focus:ring-blue-800 font-medium text-sm transition-colors">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard