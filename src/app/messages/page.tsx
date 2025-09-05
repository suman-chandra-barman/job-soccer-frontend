"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical, Send, Paperclip, User, Trash2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Interfaces
interface User {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "file";
  fileUrl?: string;
}

interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastTimestamp: Date;
  unread?: number;
}

export default function MessagesPage() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentUserId, setCurrentUserId] = useState("me"); // Assume current user ID
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      const mockConversations: Conversation[] = [
        {
          id: "1",
          user: {
            id: "u1",
            name: "Annette Black",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          lastMessage:
            "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question...",
          lastTimestamp: new Date(),
        },
        {
          id: "2",
          user: {
            id: "u2",
            name: "Esther Howard",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          lastMessage:
            "Mostly for calls and some music. I'd like good sound quality...",
          lastTimestamp: new Date(Date.now() - 3600000),
        },
        {
          id: "3",
          user: {
            id: "u3",
            name: "Jenny Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          lastMessage:
            "Got it! For calls and music, I'd recommend our ProSound 360...",
          lastTimestamp: new Date(Date.now() - 7200000),
        },
        {
          id: "4",
          user: {
            id: "u4",
            name: "Player",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          lastMessage: "Hey Olivia, Katherine sent me over the latest doc...",
          lastTimestamp: new Date(Date.now() - 10800000),
        },
      ];
      setConversations(mockConversations);
      if (mockConversations.length > 0) {
        setSelectedConversation(mockConversations[0].id);
      }
    };
    fetchConversations();
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        const mockMessages: Message[] = [
          {
            id: "m1",
            senderId: "u1",
            content:
              "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question...",
            timestamp: new Date(Date.now() - 86400000),
            type: "text",
          },
          {
            id: "m2",
            senderId: currentUserId,
            content:
              "Mostly for calls and some music. I'd like good sound quality...",
            timestamp: new Date(Date.now() - 7200000),
            type: "text",
          },
          {
            id: "m3",
            senderId: "u1",
            content:
              "Absolutely! We have a great selection of wireless headsets...",
            timestamp: new Date(Date.now() - 3600000),
            type: "text",
          },
          {
            id: "m4",
            senderId: currentUserId,
            content:
              "Mostly for calls and some music. I'd like good sound quality.",
            timestamp: new Date(Date.now() - 1800000),
            type: "text",
          },
          {
            id: "m5",
            senderId: "u1",
            content:
              "Got it! For calls and music, I'd recommend our ProSound 360 headset...",
            timestamp: new Date(Date.now() - 900000),
            type: "text",
          },
        ];
        setMessages(mockMessages);
      };
      fetchMessages();
    }
  }, [selectedConversation, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedUser = conversations.find(
    (conv) => conv.id === selectedConversation
  )?.user;

  const handleSendMessage = async () => {
    if (newMessage.trim() || selectedFile) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        content: newMessage,
        timestamp: new Date(),
        type: selectedFile ? "file" : "text",
        fileUrl: selectedFile ? URL.createObjectURL(selectedFile) : undefined,
      };

      setMessages((prev) => [...prev, message]);
      setNewMessage("");
      setSelectedFile(null);

      // await fetch('/api/messages', { method: 'POST', body: JSON.stringify({ conversationId: selectedConversation, ...message }) });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDeleteConversation = async () => {
    if (selectedConversation) {
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== selectedConversation)
      );
      setSelectedConversation(null);
      // await fetch(`/api/conversations/${selectedConversation}`, { method: 'DELETE' });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container mx-auto flex h-[calc(100vh-5rem)] bg-white">
      {/* Left Sidebar: Conversations List */}
      <div
        className={`${
          selectedConversation ? "hidden md:block" : "block"
        } w-full md:w-1/3 lg:w-1/4 border-r flex-shrink-0 flex flex-col h-full`}
      >
        <div className="p-4">
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        <h3 className="p-4 text-xl">Messages</h3>
        <ScrollArea className="flex-1">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-200 rounded-2xl ${
                selectedConversation === conv.id
                  ? "bg-gray-100 rounded-2xl"
                  : ""
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                <AvatarFallback>{conv.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm">{conv.user.name}</h3>
                  <span className="text-xs text-gray-500">
                    {conv.lastTimestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-gray-600 truncate">
                  {conv.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Right: Chat Window */}
      <div
        className={`${
          !selectedConversation ? "hidden md:flex" : "flex"
        } flex-col w-full md:w-2/3 lg:w-3/4`}
      >
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mr-2"
                  onClick={() => setSelectedConversation(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="ml-3 font-semibold">{selectedUser.name}</h2>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost">
                  <Link
                    href={`/profile/${selectedUser.id}`}
                    className="flex items-center"
                  >
                    View Profile
                  </Link>
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <button
                      onClick={handleDeleteConversation}
                      className="flex items-center p-2 hover:bg-gray-100 text-red-600 w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-2 md:p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${
                    msg.senderId === currentUserId
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderId === currentUserId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.type === "text" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <a
                        href={msg.fileUrl}
                        download
                        className="text-blue-300 underline"
                      >
                        Download File
                      </a>
                    )}
                    <span className="text-xs block mt-1 opacity-75">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Fixed Footer with Input Area */}
            <footer className="bg-white border-t p-2 md:p-4 w-full">
              <div className="flex items-center rounded-lg border bg-gray-50 p-2">
                <Input
                  placeholder="Write your messages..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-transparent border-none focus:ring-0 h-12"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                {selectedFile && (
                  <div className="flex items-center bg-gray-100 p-2 rounded-md">
                    {selectedFile.type.startsWith("image/") ? (
                      <div className="h-10 w-10 relative mr-2">
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 mr-2">
                        {selectedFile.name}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={removeFile}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <Button
                  variant="secondary"
                  onClick={handleSendMessage}
                  className="bg-green-500 text-white hover:bg-green-600 ml-2 h-12 px-4 rounded-lg"
                >
                  Send
                </Button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
