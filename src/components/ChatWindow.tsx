"use client"

import { useState, useRef, useEffect } from "react"
import { useStore, Message } from "@/lib/store"
import { Send, Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "გამარჯობა! მე ვარ ვირტუალური დავით მუმლაძე. რით შემიძლია დაგეხმარო 'AI in Everyday Life' შუალედურ პროექტთან დაკავშირებით?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isLecturerMode, setIsLecturerMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { globalContext, addGlobalContext, addUnansweredQuestion } = useStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    if (isLecturerMode) {
      addGlobalContext(`Lecturer Note: ${input}`)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "✅ დამატებულია კონტექსტში!",
        },
      ])
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          globalContext,
        }),
      })

      if (!response.ok) {
        throw new Error("API response not ok");
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.text || "ბოდიში, რაღაც შეცდომაა.",
      }
      setMessages((prev) => [...prev, assistantMessage])

      if (data.isUnsure) {
        addUnansweredQuestion(userMessage.content)
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: "სამწუხაროდ, შეცდომა დაფიქსირდა. გთხოვთ, სცადოთ მოგვიანებით.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-700">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex \${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-[85%] rounded-2xl p-4 \${
                m.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700"
              }`}
            >
              <div className="flex-shrink-0 mr-3 mt-1">
                {m.role === "user" ? <User size={20} /> : <Bot size={20} className="text-blue-400" />}
              </div>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 text-gray-100 rounded-2xl rounded-bl-none p-4 flex items-center space-x-2">
              <Bot size={20} className="text-blue-400 animate-pulse" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-4 py-2 border-t border-gray-800 bg-gray-900 flex justify-end">
        <button
          type="button"
          onClick={() => {
            if (isLecturerMode) {
              setIsLecturerMode(false);
            } else {
              const pwd = prompt("Enter lecturer password:");
              if (pwd === "mumla24") setIsLecturerMode(true);
              else if (pwd) alert("Incorrect password");
            }
          }}
          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
            isLecturerMode 
              ? "bg-red-500/20 text-red-400 border border-red-500/30" 
              : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          {isLecturerMode ? "🔴 Lecturer Mode ON" : "🔒 Turn on Lecturer Mode"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-gray-900 border-t border-gray-800">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-full py-3 pl-5 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder={isLecturerMode ? "დაამატე ინფორმაცია მეხსიერებაში..." : "დასვი შეკითხვა პროექტის შესახებ..."}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  )
}
