"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { Plus, MessageSquare, Key, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import Image from "next/image"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export interface ChatSession {
  id: string
  title: string
  messages: Array<{
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
  }>
  createdAt: Date
  updatedAt: Date
}

interface AppSidebarProps {
  sessions: ChatSession[]
  currentSessionId: string
  apiKey: string
  onSessionSelect: (sessionId: string) => void
  onNewSession: () => void
  onDeleteSession: (sessionId: string) => void
  onApiKeyChange: (apiKey: string) => void
}

export function AppSidebar({
  sessions,
  currentSessionId,
  apiKey,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
  onApiKeyChange,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  const [tempApiKey, setTempApiKey] = useState(apiKey)
  const [showApiKey, setShowApiKey] = useState(false)
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(!apiKey)
  const { state } = useSidebar()

  useEffect(() => {
    setTempApiKey(apiKey)
    // Auto collapse API section when key is saved
    if (apiKey) {
      setIsApiKeyOpen(false)
    }
  }, [apiKey])

  // Auto close API config when sidebar collapses
  useEffect(() => {
    if (state === "collapsed") {
      setIsApiKeyOpen(false)
    }
  }, [state])

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onApiKeyChange(tempApiKey)
    localStorage.setItem("api-key", tempApiKey)
    // Auto collapse after saving
    setTimeout(() => {
      setIsApiKeyOpen(false)
    }, 500)
  }

  const formatSessionTitle = (session: ChatSession) => {
    if (session.messages.length > 1) {
      const firstUserMessage = session.messages.find((m) => m.role === "user")
      if (firstUserMessage) {
        return firstUserMessage.content.slice(0, 30) + (firstUserMessage.content.length > 30 ? "..." : "")
      }
    }
    return `Chat ${new Date(session.createdAt).toLocaleDateString("vi-VN")}`
  }

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 flex-shrink-0 rounded-full overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-amber-200 dark:border-cyan-400 logo-container">
              <Image
                src="/logo.svg"
                alt="Blue Book AI Logo"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-amber-900 dark:text-cyan-300">Blue Book AI</span>
            </div>
          </div>
          <SidebarTrigger className="h-6 w-6" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* API Key Section */}
        <Collapsible open={isApiKeyOpen && state !== "collapsed"} onOpenChange={setIsApiKeyOpen}>
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-amber-50 dark:hover:bg-cyan-900/20 rounded-md p-2 transition-colors">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  <span className="group-data-[collapsible=icon]:hidden">API Configuration</span>
                </div>
                <div className="group-data-[collapsible=icon]:hidden">
                  {isApiKeyOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </div>
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <Card className="dark:bg-gray-800 dark:border-cyan-400/30">
                  <CardContent className="p-3">
                    <form onSubmit={handleApiKeySubmit} className="space-y-3">
                      <div>
                        <Label htmlFor="api-key" className="text-xs dark:text-cyan-300">
                          API Key
                        </Label>
                        <div className="relative">
                          <Input
                            id="api-key"
                            type={showApiKey ? "text" : "password"}
                            value={tempApiKey}
                            onChange={(e) => setTempApiKey(e.target.value)}
                            placeholder="Nhập API key..."
                            className="text-xs h-8 dark:bg-gray-700 dark:border-cyan-400/30 dark:text-cyan-100"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-0 h-8 w-8 p-0 dark:hover:bg-cyan-900/20"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? "🙈" : "👁️"}
                          </Button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        size="sm"
                        className="w-full h-7 text-xs bg-amber-600 hover:bg-amber-700 dark:bg-cyan-600 dark:hover:bg-cyan-700"
                      >
                        Lưu API Key
                      </Button>
                    </form>
                    {apiKey && (
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">✅ API Key đã được cấu hình</div>
                    )}
                  </CardContent>
                </Card>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Separator className="dark:bg-cyan-400/30" />

        {/* Chat Sessions */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="flex items-center justify-between">
            <span>Chat Sessions</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewSession}
              className="h-6 w-6 p-0 hover:bg-amber-100 dark:hover:bg-cyan-900/20"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <ScrollArea className="h-[400px]">
              <SidebarMenu>
                {sessions.length === 0 ? (
                  <div className="text-xs text-muted-foreground dark:text-cyan-400/70 p-2 text-center group-data-[collapsible=icon]:hidden">
                    Chưa có session nào
                  </div>
                ) : (
                  sessions.map((session) => (
                    <SidebarMenuItem key={session.id} className="group">
                      <div className="flex items-center gap-1 w-full">
                        <SidebarMenuButton asChild isActive={session.id === currentSessionId} className="flex-1">
                          <button onClick={() => onSessionSelect(session.id)} className="text-left">
                            <MessageSquare className="h-3 w-3" />
                            <span className="text-xs truncate group-data-[collapsible=icon]:hidden">
                              {formatSessionTitle(session)}
                            </span>
                          </button>
                        </SidebarMenuButton>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity group-data-[collapsible=icon]:hidden hover:bg-red-100 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="dark:bg-gray-800 dark:border-cyan-400/30">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="dark:text-cyan-300">Xóa session chat?</AlertDialogTitle>
                              <AlertDialogDescription className="dark:text-cyan-400/70">
                                Hành động này không thể hoàn tác. Session chat và tất cả tin nhắn sẽ bị xóa vĩnh viễn.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="dark:bg-gray-700 dark:text-cyan-300 dark:hover:bg-gray-600">
                                Hủy
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDeleteSession(session.id)}
                                className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </SidebarMenuItem>
                  ))
                )}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="text-xs text-muted-foreground dark:text-cyan-400/70 p-2 text-center group-data-[collapsible=icon]:hidden">
          Blue Book AI v1.0
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
