"use client"

import { motion } from "framer-motion"
import { Sparkles, ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gray-950">
        <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute -bottom-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-purple-900/20 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8"
        >
          <Sparkles size={16} />
          <span className="text-sm font-medium tracking-wide">შუალედური პროექტი</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6"
        >
          პირველი AI <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            სტარტაპი
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          შექმენი შენი პირველი სრულფასოვანი პროდუქტი AI ინსტრუმენტების 
          გამოყენებით. პროცესი მოიცავს იდეის გენერაციიდან საბოლოო ვებ-საიტის 
          აწყობამდე ყველა ნაბიჯს.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a href="#chat" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-950 hover:bg-gray-100 rounded-full font-semibold transition-all hover:scale-105">
            დასვი კითხვა
            <ArrowRight size={20} />
          </a>
        </motion.div>
      </div>
    </div>
  )
}
