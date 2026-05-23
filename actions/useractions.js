"use server"
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })

    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }
    let x = await instance.orders.create(options)

    //create a payment object which shows a pending payment

    await Payment.create({ oid: x.id, amount: amount/100, to_user: to_username, name: paymentform.name, message: paymentform.message })
    return x;
}
export const fetchuser = async (username) => {
    await connectDB()

    let user = await User.findOne({ username }).lean()

    if (!user) return null

    return {
        ...user,
        _id: user._id.toString(),
        createdAt: user.createdAt?.toString(),
        updatedAt: user.updatedAt?.toString(),
    }
}
export const fetchpayments = async (username) => {
    await connectDB()

    let p = await Payment.find({ to_user: username, done:true})
        .sort({ amount: -1 })
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
    //if the username is being updated, check if username is available
    if (oldusername != ndata.username) {
        let u = await User.findOne({ username: ndata.username})
        if (u){
            return {error:"Username already exists"}
        }

        await User.updateOne({email : ndata.email},ndata)
    }
}