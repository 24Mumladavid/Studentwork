"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "სტარტაპის გეგმა (GenAI)",
    desc: "იდეის ჩამოყალიბება და 2 სხვადასხვა AI-ს (მაგ. ChatGPT, DeepSeek) პასუხების შედარება.",
    tools: ["ChatGPT", "Claude", "DeepSeek", "Gemini"]
  },
  {
    id: 2,
    title: "ვიზუალური იდენტობა",
    desc: "მინიმუმ 3 სურათის (ლოგო, ბანერი) და 1 მოკლე ვიდეოს გენერაცია AI-ით.",
    tools: ["Nano Banana", "Flow", "Midjourney", "Runway"]
  },
  {
    id: 3,
    title: "ბრენდის მუსიკა",
    desc: "30-60 წამიანი უნიკალური ჯინგლის ან ბექგრაუნდ მუსიკის შექმნა.",
    tools: ["Suno", "Udio", "ProducerAI"]
  },
  {
    id: 4,
    title: "პრეზენტაცია და პოდკასტი",
    desc: "NotebookLM-ით პრეზენტაციის სლაიდების და 3-7 წუთიანი პოდკასტის (Audio Overview) შექმნა.",
    tools: ["NotebookLM"]
  },
  {
    id: 5,
    title: "ვებ-საიტი (Lovable)",
    desc: "სრულფასოვანი ვებ-საიტის აწყობა, სადაც თავმოყრილი იქნება წინა ნაბიჯებში შექმნილი ყველა მასალა.",
    tools: ["Lovable"]
  }
]

export default function Checklist() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">პროექტის ნაბიჯები</h2>
        <p className="text-gray-400">მიჰყევი ამ ნაბიჯებს შენი პირველი AI სტარტაპის შესაქმნელად</p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            key={step.id}
            className="group relative bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-sm border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  {step.id}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs font-medium border border-gray-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
