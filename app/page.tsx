"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { BookOpen, Send, Bot, User, Loader2 } from "lucide-react"
import { BookDecoration } from "@/components/book-decoration"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface SuggestedPrompt {
  id: string
  text: string
  icon: string
}

export default function BookRecommendationChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Xin chào! Tôi là AI assistant chuyên gợi ý sách. Hãy cho tôi biết bạn đang tìm kiếm loại sách gì, thể loại yêu thích, hoặc mô tả về cuốn sách lý tưởng của bạn nhé!",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [sessionId] = useState(() => uuidv4())
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      id: "1",
      text: "Gợi ý sách trinh thám hay nhất để đọc cuối tuần",
      icon: "🔍",
    },
    {
      id: "2",
      text: "Tôi muốn đọc sách về phát triển bản thân và tư duy tích cực",
      icon: "🌟",
    },
    {
      id: "3",
      text: "Sách khoa học viễn tưởng phù hợp cho người mới bắt đầu",
      icon: "🚀",
    },
    {
      id: "4",
      text: "Tiểu thuyết lãng mạn có cốt truyện hấp dẫn",
      icon: "💕",
    },
    {
      id: "5",
      text: "Sách lịch sử Việt Nam dễ hiểu và thú vị",
      icon: "📚",
    },
    {
      id: "6",
      text: "Sách dạy nấu ăn cho người bận rộn",
      icon: "👨‍🍳",
    },
  ]

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input.trim(),
          sessionChatId: sessionId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get recommendation")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.recommendation || "Xin lỗi, tôi không thể đưa ra gợi ý lúc này. Vui lòng thử lại sau.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, đã có lỗi xảy ra khi kết nối với server. Vui lòng thử lại sau.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedPrompt = (promptText: string) => {
    setInput(promptText)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Book Decorations */}
      <BookDecoration />

      {/* Header */}
      <div className="border-b border-amber-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-900">AI Book Advisor</h1>
              <p className="text-sm text-amber-700">Trợ lý AI gợi ý sách thông minh</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-140px)] flex flex-col">
        <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-amber-700" />
                  </div>
                )}

                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === "user"
                      ? "bg-amber-600 text-white border-amber-600"
                      : "bg-white border-amber-200 shadow-sm"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <MarkdownRenderer content={message.content} />
                  ) : (
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  )}
                  <div className={`text-xs mt-2 ${message.role === "user" ? "text-amber-100" : "text-amber-600"}`}>
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </Card>

                {message.role === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-amber-700" />
                </div>
                <Card className="bg-white border-amber-200 shadow-sm p-4">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Đang tìm kiếm gợi ý sách cho bạn...</span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Prompts */}
        {showSuggestions && messages.length <= 1 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-amber-800 mb-3">💡 Gợi ý câu hỏi:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt.id}
                  variant="outline"
                  className="h-auto p-3 text-left justify-start border-amber-200 hover:border-amber-400 hover:bg-amber-50 transition-colors"
                  onClick={() => handleSuggestedPrompt(prompt.text)}
                >
                  <span className="mr-2 text-lg">{prompt.icon}</span>
                  <span className="text-sm text-amber-800 line-clamp-2">{prompt.text}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="mt-4 border-t border-amber-200 pt-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mô tả loại sách bạn muốn tìm..."
              className="flex-1 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          <p className="text-xs text-amber-600 mt-2 text-center">Nhấn Enter để gửi tin nhắn</p>
        </div>
      </div>
    </div>
  )
}
