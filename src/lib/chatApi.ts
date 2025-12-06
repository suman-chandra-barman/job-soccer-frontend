const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1";

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

// Helper function to get auth token
function getAuthToken(): string {
  if (typeof window !== "undefined") {
    // Try to get from localStorage or your auth state
    const token = localStorage.getItem("accessToken") || "";
    return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }
  return "";
}

// Chat API functions
export const chatApi = {
  // Create or get chat with a user
  async createOrGetChat(otherUserId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/create-or-get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
      },
      body: JSON.stringify({ otherUserId }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to create or get chat");
    }

    return response.json();
  },

  // Get all user chats
  async getMyChats(page = 1, limit = 20): Promise<ApiResponse> {
    const response = await fetch(
      `${API_BASE_URL}/chat/my-chats?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch chats");
    }

    return response.json();
  },

  // Get chat by ID
  async getChatById(chatId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
      method: "GET",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chat");
    }

    return response.json();
  },

  // Get blocked chats
  async getBlockedChats(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/blocked`, {
      method: "GET",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch blocked chats");
    }

    return response.json();
  },

  // Block user
  async blockUser(chatId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}/block`, {
      method: "POST",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to block user");
    }

    return response.json();
  },

  // Unblock user
  async unblockUser(chatId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}/unblock`, {
      method: "POST",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to unblock user");
    }

    return response.json();
  },

  // Delete chat
  async deleteChat(chatId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
      method: "DELETE",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete chat");
    }

    return response.json();
  },
};

// Message API functions
export const messageApi = {
  // Send message via REST
  async sendMessage(
    chatId: string,
    receiverId: string,
    content?: string,
    messageType: "text" | "image" | "video" | "file" = "text",
    mediaUrl?: string
  ): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/message/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthToken(),
      },
      body: JSON.stringify({
        chatId,
        receiverId,
        content,
        messageType,
        mediaUrl,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    return response.json();
  },

  // Get messages for a chat
  async getMessagesByChatId(
    chatId: string,
    page = 1,
    limit = 50
  ): Promise<ApiResponse> {
    const response = await fetch(
      `${API_BASE_URL}/message/chat/${chatId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    return response.json();
  },

  // Mark messages as read
  async markMessagesAsRead(chatId: string): Promise<ApiResponse> {
    const response = await fetch(
      `${API_BASE_URL}/message/chat/${chatId}/mark-read`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthToken(),
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to mark messages as read");
    }

    return response.json();
  },

  // Get unread message count
  async getUnreadCount(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/message/unread-count`, {
      method: "GET",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch unread count");
    }

    return response.json();
  },

  // Search messages
  async searchMessages(
    chatId: string,
    searchTerm: string
  ): Promise<ApiResponse> {
    const response = await fetch(
      `${API_BASE_URL}/message/chat/${chatId}/search?searchTerm=${encodeURIComponent(
        searchTerm
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: getAuthToken(),
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to search messages");
    }

    return response.json();
  },

  // Delete message
  async deleteMessage(messageId: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/message/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: getAuthToken(),
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    return response.json();
  },
};
