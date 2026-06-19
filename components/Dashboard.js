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
            {/* Same as */}
            <ToastContainer />
            <div className='container mx-auto py-5 px-6 '>
                <h1 className='text-center my-5 text-3xl font-bold'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto" action={handleSubmit}>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* Profile Picture Upload using Cloudinary */}
                    <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>

                        {/* Image Preview */}
                        {form.profilepic && (
                            <img src={form.profilepic} alt="Profile Preview" className="w-20 h-20 rounded-full object-cover mb-3" />
                        )}

                        {/* URL - save in Database */}
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
                                        className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 border border-gray-600"
                                    >
                                        Upload Profile Picture
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>

                    {/* Cover Picture Upload using Cloudinary */}
                    <div className="my-4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>

                        {/* Cover Preview */}
                        {form.coverpic && (
                            <img src={form.coverpic} alt="Cover Preview" className="w-full h-32 object-cover rounded-lg mb-3" />
                        )}

                        {/* URL- save in Database */}
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
                                        className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 border border-gray-600"
                                    >
                                        Upload Cover Picture
                                    </button>
                                );
                            }}
                        </CldUploadWidget>
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="password" name='razorpayid' id="razorpayid" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="password" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-blue-500 focus:ring-4 focus:outline-none   dark:focus:ring-blue-800 font-medium text-sm">Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard