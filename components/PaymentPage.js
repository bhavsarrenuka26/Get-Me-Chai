"use client";
import React from "react";
import Script from "next/script";
import { fetchpayments, fetchuser, initiate } from "@/actions/useractions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from "react-toastify";
import { useRouter,notFound } from "next/navigation";

const PaymentPage = ({ username }) => {
     const {data:session}=useSession()
    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })
    const [currentuser, setcurrentuser] = useState({
        coverpic: "",
        profilepic: "",
        razorpayid: "",
        razorpaysecret: ""
    })
    const searchParams = useSearchParams()
    const router = useRouter()
    const [payments, setpayments] = useState([])
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get("paymentdone") == "true") {
            toast('✔️ Payment Done', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        router.push(`/${username}`)
    }, [])

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
       
    }

    const getData = async () => {
        let u = await fetchuser(username)
        setcurrentuser(u);
        let dbpayments = await fetchpayments(username)
        setpayments(dbpayments)
     
    }



    const pay = async (amount) => {
        //Get the order id
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentuser?.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me a Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },

        }
        var rzp1 = new Razorpay(options);
        rzp1.open();

    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full bg-red-50 relative">
                <img
                    className="object-cover w-full h-48 md:h-[350px]"
                    src={currentuser?.coverpic || "/defaultcover.gif"}
                    alt=""
                />
                <div className="profile absolute right-[36%] md:right-[46%] -bottom-16 border-2 border-white rounded-full overflow-hidden">
                    <img
                        className="w-[120px] h-[120px] rounded-full"
                        src={currentuser?.profilepic || "/defaultprofile.png"}
                        alt=""
                    />
                </div>
            </div>
            <div className="info flex flex-col  justify-center items-center my-20 gap-2 mb-7">
                <div className="font-bold text-lg">@{username}</div>

                <div className="text-slate-400">Let's help {username} to get a chai!!</div>
                <div className="text-slate-400">
                   {payments.length} Payments . ₹{payments.reduce((a,b)=>a+b.amount,0)} raised!!
                </div>
                <div className="payment flex gap-2 w-[90%] mt-11 flex-col md:flex-row">
                    <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10">
                        {/* show list of all the supporters as a leaderboard */}
                        <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
                        <ul className="mx-3 md:text-md text:sm">
                            {payments.length == 0 && <li>No Payments yet!!</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className="my-4 flex gap-2 items-center">
                                    <img width={33} src="/avatar.gif" alt="" />
                                    <span> {p.name} donated <span className="font-bold">₹{p.amount}</span> with a message "{p.message}"</span></li>
                            })}
                        </ul>
                    </div>
                    <div className="makepayment bg-slate-900 w-full md:w-1/2 rounded-lg p-10">
                        <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                        <div className="flex  flex-col gap-2 ">
                            <input onChange={handleChange} value={paymentform.name} name='name' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' />
                            <input onChange={handleChange} value={paymentform.message} name='message' type="text" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="number" className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' />
                            <button onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:bg-slate-600 disabled:from-purple-100" disabled={paymentform.name?.length < 2 || paymentform.message?.length < 4|| paymentform.amount?.length<1} >Pay</button>

                        </div>
                        {/* or choose from this amounts */}
                       <div className='flex flex-col md:flex-row gap-2 mt-5'>
                            <button className="p-3 bg-slate-800 rounded-lg" onClick={() => pay(1000)}>Pay ₹10</button>
                            <button className="p-3 bg-slate-800 rounded-lg" onClick={() => pay(2000)}>Pay ₹20</button>
                            <button className="p-3 bg-slate-800 rounded-lg" onClick={() => pay(3000)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
