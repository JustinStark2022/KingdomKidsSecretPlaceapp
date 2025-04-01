export interface FriendRequest {
    id: string;
    status: "pending" | "approved" | "denied";
    senderId: string;
    receiverId: string;
    createdAt: string;
  }