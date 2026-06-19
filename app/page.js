import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
   <div className="flex justify-center items-center flex-col gap-4 text-white h-[40vh] px-5 md:px-0 text-xs md:text-base">
    <div className="font-bold md:text-5xl text-xl flex gap-1 justify-center items-center">Get Me a Chai <span><img className="invertImg" src="/tea.gif" width={88} alt="" /></span></div>
    <p className="text-center md:text-left">
          A crowdfunding platform for creators to fund their projects. 
          
        </p>
        <p className="text-center md:text-left">

          A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
        </p>
    <div>
      <Link href={"/login"}>
     <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>
     <Link href={"/about"}>
    <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5">Read More</button></Link>
    </div>
   </div>
   <div className="bg-white h-1 opacity-15">
   </div>
   <div className="text-white container mx-auto pb-28 pt-14 px-10">
     <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>
  <div className="flex gap-5 justify-around">
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/man.gif" alt="" />
      <p className="font-bold text-center">Fans want to help</p>
      <p className="text-center">Your fans are available to support you</p>
    </div>
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/coin.gif" alt="" />
      <p className="font-bold text-center">Fans want to contribute</p>
      <p className="text-center">Your fans are willing to contribute financially</p>
    </div>
    <div className="item space-y-3 flex flex-col items-center justify-center">
      <img className="bg-slate-400 rounded-full p-2 text-black" width={88} src="/group.gif" alt="" />
      <p className="font-bold text-center">Fans want to collaborate</p>
      <p className="text-center">Your fans are ready to collaborate with you</p>
    </div>
    </div>
   </div>
   <div className="bg-white h-1 opacity-15">
   </div>
  <div className="text-white container mx-auto pb-28 pt-14 flex flex-col items-center justify-center">
  
  <h2 className="text-3xl font-bold text-center mb-10">
    Learn more about us
  </h2>

  <div className="w-full max-w-4xl">
 
  <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-8 shadow-2xl">
    <h2 className="text-3xl font-bold text-center text-white mb-8">How it Works</h2>
    
    <div className="grid md:grid-cols-3 gap-8">
      
      <div className="text-center">
        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-blue-500/30">1</div>
        <h3 className="text-lg font-semibold text-white mb-2">Create a Profile</h3>
        <p className="text-sm text-gray-400">Sign in and set up your personalized creator page in less than two minutes.</p>
      </div>
      
      
      <div className="text-center">
        <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-purple-500/30">2</div>
        <h3 className="text-lg font-semibold text-white mb-2">Share Your Link</h3>
        <p className="text-sm text-gray-400">Post your unique 'Get Me a Chai' link on your YouTube, Instagram, or GitHub.</p>
      </div>
      
      
      <div className="text-center">
        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-green-500/30">3</div>
        <h3 className="text-lg font-semibold text-white mb-2">Get Funded</h3>
        <p className="text-sm text-gray-400">Fans can buy you a chai, leaving custom messages while funds go straight to you.</p>
      </div>
    </div>
  </div>
</div>
  </div>
   <div className="bg-white h-1 opacity-15"></div>
   </>
  );
}
