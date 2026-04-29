"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, X } from "lucide-react"

interface LecturerLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
}

export default function LecturerLoginModal({ isOpen, onClose, onLogin }: LecturerLoginModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "admin" && password === "mumla24") {
      setError(false)
      onLogin()
      setUsername("")
      setPassword("")
    } else {
      setError(true)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Lock size={20} className="text-blue-500" />
                Lecturer Login
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-900/50 border border-red-500/50 text-red-200 rounded-lg text-sm text-center">
                  Invalid credentials.
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter username"
                  autoComplete="off"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
              >
                Access Dashboard
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
