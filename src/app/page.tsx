"use client"
import Hero from "@/components/Hero"
import Checklist from "@/components/Checklist"
import ChatWindow from "@/components/ChatWindow"
import LecturerLoginModal from "@/components/LecturerLoginModal"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const router = useRouter()

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false)
    sessionStorage.setItem("lecturerAuth", "true")
    router.push("/admin")
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-blue-500/30">
      <header className="fixed top-0 w-full z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            Assistant
          </div>
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Lecturer Login
          </button>
        </div>
      </header>

      <div className="pt-16">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12 items-start">
          <div className="order-2 lg:order-1">
            <Checklist />
          </div>
          
          <div id="chat" className="order-1 lg:order-2 lg:sticky lg:top-24 mt-12 lg:mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">გაქვს კითხვები?</h2>
              <p className="text-gray-400">AI ასისტენტი მზადაა დაგეხმაროს პროექტის ნებისმიერ ეტაპზე</p>
            </div>
            <ChatWindow />
          </div>
        </div>
      </div>

      <LecturerLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />
    </main>
  )
}
