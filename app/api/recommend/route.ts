import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function POST(request: NextRequest) {
  try {
    const { prompt, sessionChatId, apiKey } = await request.json()

    if (!prompt || !sessionChatId || !apiKey) {
      return NextResponse.json({ error: "Prompt, sessionChatId, and apiKey are required" }, { status: 400 })
    }

    // Call the backend API with sessionChatId
    const response = await fetch(`${API_BASE_URL}/api/books/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        sessionChatId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json({
      recommendation: data.recommendation || data.message || data.response || "Không có gợi ý nào được trả về.",
    })
  } catch (error) {
    console.error("API Error:", error)

    return NextResponse.json(
      {
        error: "Failed to get book recommendation",
        recommendation: "Xin lỗi, hiện tại không thể kết nối đến server gợi ý sách. Vui lòng thử lại sau.",
      },
      { status: 500 },
    )
  }
}
