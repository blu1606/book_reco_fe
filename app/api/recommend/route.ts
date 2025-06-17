import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, sessionChatId } = await request.json()

    if (!prompt || !sessionChatId) {
      return NextResponse.json({ error: "Prompt and sessionChatId are required" }, { status: 400 })
    }

    // Call the backend API with sessionChatId
    const response = await fetch("http://localhost:8080/api/books/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
