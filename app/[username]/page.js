import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import connectDB from "@/db/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
  //if the username is not present in the database show 404
  const checkUser = async () => {
    await connectDB();
    let u = await User.findOne({ username: (await params).username });
    if (!u) {
      return notFound();
    }
  };

  await checkUser()
  return (
    <>
      <PaymentPage username={(await params).username} />
    </>
  );
};

export default Username;
export async function generateMetadata({ params }) {
  return {
    title: `Support ${(await params).username} - Get Me A Chai`,
  }
}