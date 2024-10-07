import React from "react";

function LoginById() {
  return (
    <section className="flex ">
      <img src="/assets/basket.png" alt="" className=" h-[95vh] rounded-lg" />
      <div className=" flex justify-center items-center w-[60vw] ">
        <div className="bg-gradient-to-r from-orange-200 to-orange-100 h-[75vh] w-fit p-8 rounded-lg flex flex-col items-center justify-center align-middle">
            <img src="/assets/logo_1.png" alt="" className="h-24"/>
            <p className="font-semibold">Your ultimate freshness fix to experience purest flavor</p>
            <div className="flex flex-col my-6 w-[70%]">
            <label htmlFor="">Phone Number</label>
            <input type="number" placeholder="Enter your phone number" className="my-2 rounded-md w-full"/>
            <label htmlFor="">Unique Id</label>
            <input type="text" placeholder="Enter your Unique ID" className="my-2 rounded-md w-full"/>
            <button className="bg-[#619524] rounded-full text-white my-3 px-3 py-2">
                Login
            </button>
            </div>
            <p>New User? <span className="text-orange-800 font-semibold">Login by your phone number</span></p>
            <p>By Continuing, you agree to the <span className="text-orange-800 font-semibold">Terms of use</span> & <span className="text-orange-800 font-semibold">Privacy policies</span></p>
        </div>
      </div>
    </section>
  );
}

export default LoginById;
