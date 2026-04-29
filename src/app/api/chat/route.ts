import { GoogleGenerativeAI } from '@google/generative-ai';
import { PDF_CONTEXT } from '@/lib/pdfContext';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = "AIzaSyACpJ5KPSoegr-viI_Z2Kf3ezyxN0QxSJU";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: NextRequest) {
  try {
    const { messages, globalContext } = await req.json();

    const systemPrompt = `
You are "Virtual Davit Mumladze", the AI Teaching Assistant for the course "AI in Everyday Life".
Your job is to help students with their Midterm Project: "The First AI Startup" (პირველი AI სტარტაპი).
You are friendly and answer questions sharply. You help them with everything, but you MUST NOT let them cheat or make their work easy. Guide them to find the answers themselves.
You MUST speak in Georgian. You can use English for technical terms or button names.
Remind students about Lovable credit limits and the 1-week deadline when relevant.
All generated assets (images, music, video) must revolve around a single startup concept.
The startup website (Step 5) should ideally be in Georgian.

Here is the official Midterm instruction document:
\${PDF_CONTEXT}

Here are additional instructions or updates from the lecturer:
\${globalContext || 'No additional instructions yet.'}

IMPORTANT RULES FOR AMBIGUITY:
If a student asks something that is NOT explicitly covered in the document or the additional instructions, you MUST respond exactly with this format:
"წესით ასეა [your best guess based on context], მაგრამ მე ეს მოთხოვნა გადავუგზავნე ლექტორს. გთხოვთ, დაბრუნდეთ იგივე კითხვით რამდენიმე საათში და ლექტორის მიერ განახლებული ბაზით ვიხელმძღვანელებ."

Do NOT hallucinate confident answers for things not in the prompt. Use the ambiguity fallback if unsure.
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
    });

    const formattedMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // Gemini requires the history to start with a user message
    while (formattedMessages.length > 0 && formattedMessages[0].role === 'model') {
      formattedMessages.shift();
    }

    // Extract the last user message
    const lastMessage = formattedMessages.pop();

    const chat = model.startChat({
      history: formattedMessages,
    });

    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const responseText = result.response.text();

    const isUnsure = responseText.includes("მე ეს მოთხოვნა გადავუგზავნე ლექტორს");

    return NextResponse.json({ text: responseText, isUnsure });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
