"use client";
import React, { useEffect, useState, createContext, useRef } from "react";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const SOCKET_SERVER_URL =
  (process.env.NEXT_PUBLIC_BASE_URL || "") + "/notifications";

export const NotificationContext = createContext({
  message: "",
  user: "",
});

interface NotificationI {
  message: string;
  user: string;
  userId?: number;
}

interface NotificationProviderPropsI {
  children: React.ReactNode;
}

const NotificationComponent = ({ children }: NotificationProviderPropsI) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageRef = useRef(page);

  const [notifications, setNotifications] = useState<NotificationI>({
    message: "",
    user: "",
  });

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socket.on("newPost", (data: any) => {
      let currentlUserId = "";
      if (typeof window !== "undefined") {
        const match = document.cookie.match(/userId=([^;]+)/);
        if (match) currentlUserId = decodeURIComponent(match[1]);
      }

      const senderId =
        data.userId || (typeof data.user === "number" ? data.user : null);

      if (
        senderId &&
        currentlUserId &&
        String(senderId) === String(currentlUserId)
      ) {
        return;
      }

      setNotifications(data);

      if (pageRef.current === 1) {
        router.refresh();
      }

      const displayName =
        data.username || (typeof data.user === "string" ? data.user : "User");

      toast(`${displayName} added a new post: ${data.message}`, {
        duration: 5000,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [router]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
      <Toaster position="bottom-right" reverseOrder={false} />
    </NotificationContext.Provider>
  );
};

export default NotificationComponent;
