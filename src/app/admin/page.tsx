"use client"

import { useStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const { unansweredQuestions, answerQuestion } = useStore()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Basic client-side check. In a real app, use middleware/cookies.
    const auth = sessionStorage.getItem("lecturerAuth")
    if (auth !== "true") {
      router.push("/")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) return null // or a loading spinner

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmitAnswer = (id: string) => {
    if (answers[id]?.trim()) {
      answerQuestion(id, answers[id])
      setAnswers((prev) => {
        const newAnswers = { ...prev }
        delete newAnswers[id]
        return newAnswers
      })
    }
  }

  const pendingQuestions = unansweredQuestions.filter((q) => q.status === "pending")
  const answeredQuestions = unansweredQuestions.filter((q) => q.status === "answered")

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Lecturer Admin Dashboard</h1>
          <button
            onClick={() => {
              sessionStorage.removeItem("lecturerAuth")
              router.push("/")
            }}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Pending Questions ({pendingQuestions.length})</h2>
            {pendingQuestions.length === 0 ? (
              <p className="text-gray-500 italic bg-gray-900/50 p-6 rounded-xl border border-gray-800 text-center">No pending questions.</p>
            ) : (
              <div className="space-y-4">
                {pendingQuestions.map((q) => (
                  <div key={q.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl space-y-4 shadow-lg">
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-medium text-white">{q.question}</p>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {new Date(q.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <textarea
                        value={answers[q.id] || ""}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        placeholder="Type the official answer here... This will be injected into the AI's knowledge base."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                      />
                      <button
                        onClick={() => handleSubmitAnswer(q.id)}
                        disabled={!answers[q.id]?.trim()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
                      >
                        Submit Answer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="pt-8">
            <h2 className="text-xl font-semibold mb-4 text-green-400">Answered Questions & Global Context</h2>
            {answeredQuestions.length === 0 ? (
              <p className="text-gray-500 italic">No answered questions yet.</p>
            ) : (
              <div className="space-y-4">
                {answeredQuestions.map((q) => (
                  <div key={q.id} className="bg-gray-900/50 border border-gray-800 p-5 rounded-xl opacity-75">
                    <p className="font-medium text-gray-300 mb-2">Q: {q.question}</p>
                    <p className="text-green-400 text-sm">A: {q.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
