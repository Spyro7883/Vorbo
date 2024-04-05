"use client"
import { useState } from "react";

export default function Home() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  return (
    <div>
      <header className="p-12">
        <h1 className="flex justify-center">
          Live Chat Application
        </h1>

      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <section>
            <button onClick={() => setShowLoginPopup(true)}>Login</button>
            <button onClick={() => setShowRegisterPopup(true)}>Register</button>
          </section>

        </div>
      </main>
      <footer />
    </div>
  )
}
