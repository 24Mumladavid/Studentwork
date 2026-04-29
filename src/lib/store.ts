import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Message = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type UnansweredQuestion = {
  id: string
  question: string
  timestamp: number
  status: 'pending' | 'answered'
  answer?: string
}

type StoreState = {
  globalContext: string
  unansweredQuestions: UnansweredQuestion[]
  addGlobalContext: (context: string) => void
  addUnansweredQuestion: (question: string) => void
  answerQuestion: (id: string, answer: string) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      globalContext: '',
      unansweredQuestions: [],
      addGlobalContext: (context) =>
        set((state) => ({
          globalContext: state.globalContext + '\n\n' + context,
        })),
      addUnansweredQuestion: (question) =>
        set((state) => ({
          unansweredQuestions: [
            ...state.unansweredQuestions,
            {
              id: Math.random().toString(36).substring(7),
              question,
              timestamp: Date.now(),
              status: 'pending',
            },
          ],
        })),
      answerQuestion: (id, answer) =>
        set((state) => {
          const question = state.unansweredQuestions.find((q) => q.id === id);
          let newContext = state.globalContext;
          if (question) {
             newContext += `\n\nQ: ${question.question}\nA: ${answer}`;
          }
          return {
            globalContext: newContext,
            unansweredQuestions: state.unansweredQuestions.map((q) =>
              q.id === id ? { ...q, status: 'answered', answer } : q
            ),
          }
        }),
    }),
    {
      name: 'midterm-assistant-storage',
    }
  )
)
