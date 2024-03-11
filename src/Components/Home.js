import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className=" h-screen flex justify-center items-center relative ">
      <div className="py-7 shadow-lg px-9 bg-black  rounded-md text-white flex flex-col  items-center gap-3">
        <h1 className="text-2xl mb-3">Blog-GPT</h1>
        <p className="text-sm">
          AI powered SAAS solution to genrate SEO optimizes blog post
        </p>
        <div className="w-full">
          <Link to="/login"><button className="py-1 w-full bg-green-600 rounded-sm opacity-100 mt-3">
            Begin
          </button></Link>
        </div>
      </div>
    </div>
  );
}
