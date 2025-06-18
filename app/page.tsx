"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { BookDecoration } from "@/components/book-decoration"
import { SocialLinks } from "@/components/social-links"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar, type ChatSession } from "@/components/app-sidebar"
import Image from "next/image"

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
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>("")
  const [apiKey, setApiKey] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Xin chào! Tôi là AI assistant chuyên gợi ý sách. Hãy cho tôi biết bạn đang tìm kiếm loại sách gì, thể loại yêu thích, hoặc mô tả về cuốn sách lý tưởng của bạn nhé!",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem("chat-sessions")
    const savedApiKey = localStorage.getItem("api-key")

    if (savedSessions) {
      const parsedSessions: ChatSession[] = JSON.parse(savedSessions).map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }))
      setSessions(parsedSessions)

      if (parsedSessions.length > 0) {
        const latestSession = parsedSessions[0]
        setCurrentSessionId(latestSession.id)
        setMessages(latestSession.messages)
        setShowSuggestions(latestSession.messages.length <= 1)
      }
    } else {
      // Create initial session
      createNewSession()
    }

    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
  }, [])

  // Save sessions to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem("chat-sessions", JSON.stringify(sessions))
    }
  }, [sessions])

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

  const createNewSession = () => {
    const newSessionId = uuidv4()
    const initialMessage: Message = {
      id: "1",
      content:
        "Xin chào! Tôi là AI assistant chuyên gợi ý sách. Hãy cho tôi biết bạn đang tìm kiếm loại sách gì, thể loại yêu thích, hoặc mô tả về cuốn sách lý tưởng của bạn nhé!",
      role: "assistant",
      timestamp: new Date(),
    }

    const newSession: ChatSession = {
      id: newSessionId,
      title: "New Chat",
      messages: [initialMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setSessions((prev) => [newSession, ...prev])
    setCurrentSessionId(newSessionId)
    setMessages([initialMessage])
    setShowSuggestions(true)
  }

  const handleSessionSelect = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setMessages(session.messages)
      setShowSuggestions(session.messages.length <= 1)
    }
  }

  const handleDeleteSession = (sessionId: string) => {
    const updatedSessions = sessions.filter((s) => s.id !== sessionId)
    setSessions(updatedSessions)

    if (sessionId === currentSessionId) {
      if (updatedSessions.length > 0) {
        handleSessionSelect(updatedSessions[0].id)
      } else {
        createNewSession()
      }
    }
  }

  const updateCurrentSession = (newMessages: Message[]) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === currentSessionId ? { ...session, messages: newMessages, updatedAt: new Date() } : session,
      ),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (!apiKey) {
      alert("Vui lòng nhập API key trong sidebar trước khi sử dụng!")
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    updateCurrentSession(newMessages)
    setInput("")
    setIsLoading(true)
    setShowSuggestions(false)

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input.trim(),
          sessionChatId: currentSessionId,
          apiKey: apiKey,
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

      const finalMessages = [...newMessages, assistantMessage]
      setMessages(finalMessages)
      updateCurrentSession(finalMessages)
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Xin lỗi, đã có lỗi xảy ra khi kết nối với server. Vui lòng thử lại sau.",
        role: "assistant",
        timestamp: new Date(),
      }
      const finalMessages = [...newMessages, errorMessage]
      setMessages(finalMessages)
      updateCurrentSession(finalMessages)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedPrompt = (promptText: string) => {
    setInput(promptText)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleApiKeyChange = (newApiKey: string) => {
    setApiKey(newApiKey)
  }

  return (
    <SidebarProvider>
      <AppSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        apiKey={apiKey}
        onSessionSelect={handleSessionSelect}
        onNewSession={createNewSession}
        onDeleteSession={handleDeleteSession}
        onApiKeyChange={handleApiKeyChange}
      />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-black relative overflow-hidden">
          {/* Background Book Decorations */}
          <BookDecoration />

          {/* Header */}
          <div className="border-b border-amber-200 dark:border-cyan-400/30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-md border-2 border-amber-200 dark:border-cyan-400 logo-container cursor-pointer">
                    <Image
                      src="/logo.svg"
                      alt="Blue Book AI Logo"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-amber-900 dark:text-cyan-300">Blue Book AI</h1>
                    <p className="text-sm text-amber-700 dark:text-cyan-400">Trợ lý AI gợi ý sách thông minh</p>
                  </div>
                </div>
                <SocialLinks />
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
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-amber-700 dark:text-cyan-400" />
                      </div>
                    )}

                    <Card
                      className={`max-w-[80%] p-4 ${
                        message.role === "user"
                          ? "bg-amber-600 dark:bg-cyan-600 text-white border-amber-600 dark:border-cyan-600"
                          : "bg-white dark:bg-gray-800 border-amber-200 dark:border-cyan-400/30 shadow-sm dark:text-cyan-100"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <MarkdownRenderer content={message.content} />
                      ) : (
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                      )}
                      <div
                        className={`text-xs mt-2 ${
                          message.role === "user"
                            ? "text-amber-100 dark:text-cyan-100"
                            : "text-amber-600 dark:text-cyan-400"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </Card>

                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-600 dark:bg-cyan-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 dark:bg-cyan-900/50 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-amber-700 dark:text-cyan-400" />
                    </div>
                    <Card className="bg-white dark:bg-gray-800 border-amber-200 dark:border-cyan-400/30 shadow-sm p-4">
                      <div className="flex items-center gap-2 text-amber-700 dark:text-cyan-400">
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
                <h3 className="text-sm font-medium text-amber-800 dark:text-cyan-300 mb-3">💡 Gợi ý câu hỏi:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt.id}
                      variant="outline"
                      className="h-auto p-3 text-left justify-start border-amber-200 dark:border-cyan-400/30 hover:border-amber-400 dark:hover:border-cyan-400 hover:bg-amber-50 dark:hover:bg-cyan-900/20 transition-colors dark:bg-gray-800 dark:text-cyan-100"
                      onClick={() => handleSuggestedPrompt(prompt.text)}
                    >
                      <span className="mr-2 text-lg">{prompt.icon}</span>
                      <span className="text-sm text-amber-800 dark:text-cyan-300 line-clamp-2">{prompt.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="mt-4 border-t border-amber-200 dark:border-cyan-400/30 pt-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Mô tả loại sách bạn muốn tìm..."
                  className="flex-1 border-amber-200 dark:border-cyan-400/30 focus:border-amber-400 dark:focus:border-cyan-400 focus:ring-amber-400 dark:focus:ring-cyan-400 dark:bg-gray-800 dark:text-cyan-100"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-amber-600 hover:bg-amber-700 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white px-4"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
              <p className="text-xs text-amber-600 dark:text-cyan-400 mt-2 text-center">Nhấn Enter để gửi tin nhắn</p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
