"use client"
import { useState } from "react";
import RegisterPopup from "./RegisterPopup";

export default function Home() {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <header className="p-8">
        <h1 className="text-base text-center flex justify-center text-white md:text-xl lg:text-2xl">
          Live Chat Application
        </h1>

      </header>
      <main className="flex min-h-screen flex-col items-center justify-between text-white p-0 lg:pt-16">
        <div className="flex flex-col text-sm z-10 w-full max-w-5xl items-center justify-center gap-4 font-mono md:text-base lg:text-xl p-8">
          <button onClick={() => setShowRegisterPopup(!showRegisterPopup)}>{!showRegisterPopup ? 'Register' : 'Close Popup'}</button>
          {showRegisterPopup ? <RegisterPopup /> : <></>}
        </div>
      </main>
      <footer />
    </div>
  )
}
