import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
   <div className="flex justify-center items-center flex-col gap-4 text-white h-[40vh]">
    <div className="font-bold text-5xl flex gap-1 justify-center items-center">Buy Me a Chai <span><img className="invertImg" src="/tea.gif" width={88} alt="" /></span></div>
    <p>
      A crowdfunding playform for creators. Get funded by your fans and followers. Start Now!
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
   <div className="text-white container mx-auto pb-28 pt-14">
    <h2 className="text-3xl font-bold text-center mb-14">
      Your Fans can buy you a Chai
    </h2>
    <div className="flex gap-5 justify-around">
      <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className=" bg-slate-400 rounded-full p-2 text-black" src="/man.gif" width={88} alt="" />
        <p className="font-bold">Fund Yourself</p>
          <p className=" text-center">Your fans are available for to help you</p>
      </div>
       <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className=" bg-slate-400 rounded-full p-2 text-black" src="/coin.gif" width={88} alt="" />
        <p className="font-bold">Fund Yourself</p>
          <p className=" text-center">Your fans are available for to help you</p>
      </div>
       <div className="item space-y-3 flex flex-col items-center justify-center">
        <img className=" bg-slate-400 rounded-full p-2 text-black" src="/group.gif" width={88} alt="" />
        <p className="font-bold">Your Fans want to help</p>
        <p className=" text-center">Your fans are available for to help you</p>
      </div>
    </div>
   </div>
   <div className="bg-white h-1 opacity-15">
   </div>
  <div className="text-white container mx-auto pb-28 pt-14 flex flex-col items-center justify-center">
  
  <h2 className="text-3xl font-bold text-center mb-10">
    Learn more about us
  </h2>

  <div className="w-full max-w-2xl aspect-video">
    <iframe
      className="w-full h-full rounded-xl shadow-lg"
      src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  </div>

</div>
   <div className="bg-white h-1 opacity-15"></div>
   </>
  );
}
