"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import { encrypt,decrypt } from '@/lib/encryption';

export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let user = await User.findOne({ username: to_username })
    
    
    const secret = decrypt(user?.razorpaysecret?.trim());
    const id = user?.razorpayid?.trim(); 

   
    if (!id || !secret) {
        throw new Error("Razorpay credentials missing or invalid for this creator.");
    }

    var instance = new Razorpay({ key_id: id, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    
    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment
    await Payment.create({ 
        oid: x.id, 
        amount: amount / 100, 
        to_user: to_username, 
        name: paymentform.name, 
        message: paymentform.message 
    })
    
    return x;
}
export const fetchuser = async (username) => {
    await connectDB()

    let user = await User.findOne({ username }).lean()

    if (!user) return null
    user.razorpaysecret = "";
    return {
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt?.toString(),
        updatedAt: user.updatedAt?.toString(),
    }
}
export const fetchpayments = async (username) => {
    await connectDB()

    let p = await Payment.find({ to_user: username, done: true })
        .sort({ amount: -1 }).limit(10)
        .lean()

    p = p.map(payment => ({
        ...payment,
        _id: payment._id.toString()
    }))

    return p
}
export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)
    //encrypt razorpay secret
    if (ndata.razorpaysecret) {
        ndata.razorpaysecret = encrypt(ndata.razorpaysecret);
    }
    //if the username is being updated, check if username is available
    if (oldusername != ndata.username) {
        let u = await User.findOne({ username: ndata.username })
        if (u) {
            return { error: "Username already exists" }
        }
        await User.updateOne({ email: ndata.email }, ndata)
        //now update all the usernames in Payments table
        await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })


    }
    else {
        await User.updateOne({ email: ndata.email }, ndata)
    }
}
export const searchUsers = async (query) => {
    await connectDB();
    
    // If the search box is empty, return an empty array
    if (!query || query.length === 0) return [];

    // Search for matching usernames OR names
    // i - case insensitive
    let users = await User.find({
        $or: [
            { username: { $regex: query, $options: "i" } },
            { name: { $regex: query, $options: "i" } }
        ]
    })
    .select("name username profilepic") // Only fetch what we need for the dropdown
    .limit(5) //5 at a time
    .lean();

    // Convert MongoDB ObjectIds to strings 
    return users.map(user => ({
        ...user,
        _id: user._id.toString()
    }));
}