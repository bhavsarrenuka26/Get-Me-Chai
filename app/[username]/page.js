import React from "react";

const Username = async ({ params }) => {
  return (
    <>
      <div className="cover w-full bg-red-50 relative">
        <img
          className="object-cover w-full h-[350px]"
          src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/20.gif?token-hash=f_0zmyi9EgukDY-tDcfYi7hD-zWZaXdxGqbqAxYUAxw%3D&amp;token-time=1780531200"
          alt=""
        />
        <div className="profile absolute right-[46%] -bottom-16 border-2 border-white rounded-full">
          <img
            className="w-[120px] h-[120px] rounded-full"
            src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200"
            alt=""
          />
        </div>
      </div>
      <div className="info flex flex-col justify-center items-center my-20 gap-2 mb-7">
        <div className="font-bold text-lg">@{(await params).username}</div>

        <div className="text-slate-400">Creating Animated art for VTT's</div>
        <div className="text-slate-400">
          25,512 members . 110 Posts . $17,590/release
        </div>
        <div className="payment flex gap-2 w-[90%] mt-11">
          <div className="supporters w-1/2 bg-slate-900 rounded-lg p-10">
            {/* show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl font-bold my-5">Supporters</h2>
            <ul className="mx-3 text-lg">
              <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
               <span> Rahul donated <span className="font-bold">$26</span> with a message "I support you bro. Lots of ❤️"</span></li>
           <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
               <span> Rahul donated <span className="font-bold">$26</span> with a message "I support you bro. Lots of ❤️"</span></li>
               <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
               <span> Rahul donated <span className="font-bold">$26</span> with a message "I support you bro. Lots of ❤️"</span></li>
               <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
               <span> Rahul donated <span className="font-bold">$26</span> with a message "I support you bro. Lots of ❤️"</span></li>
               <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
               <span> Rahul donated <span className="font-bold">$26</span> with a message "I support you bro. Lots of ❤️"</span></li>
               <li className="my-4 flex gap-2 items-center">
                <img width={33} src="/avatar.gif" alt="" />
               <span> Rahul donated <span className="font-bold">$26</span> with a message "I support you bro. Lots of ❤️"</span></li>
            </ul>
          </div>
          <div className="makepayment bg-slate-900 w-1/2 rounded-lg p-10">
            <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
            <div className="flex  flex-col gap-2">
              <input type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Name" name="" id="" />
              <input type="text" className="w-full p-3 rounded-lg bg-slate-800" placeholder="Enter Message" name="" id="" />
              <input
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Amount"
                name=""
                id=""
              />
              <button className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" >Pay</button>
                       
            </div>
            {/* or choose from this amounts */}
            <div className="flex gap-2 mt-5">
              <button className="p-3 bg-slate-800 rounded-lg">Pay $10</button>
              <button className="p-3 bg-slate-800 rounded-lg">Pay $20</button>

              <button className="p-3 bg-slate-800 rounded-lg">Pay $30</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Username;
