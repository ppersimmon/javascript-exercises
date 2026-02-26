import React, { useEffect, useState, createContext } from "react";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router";

const SOCKET_SERVER_URL = process.env.REACT_APP_BASE_URL + "/notifications";

const NotificationContext = createContext({
  message: "",
  user: "",
});

interface NotificationI {
  message: string;
  user: string;
}

interface NotificationProviderPropsI {
  children: React.ReactNode;
}

const NotificationComponent = ({ children }: NotificationProviderPropsI) => {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const navigation = useNavigate();
  const [notifications, setNotifications] = useState<NotificationI>({
    message: "",
    user: "",
  });

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
    });

    socket.on("newPost", (data: NotificationI) => {
      setNotifications(data);
      if (page === 1) {
        navigation(0);
      }
      toast(`${data.user} add new post with description ${data.message}`, {
        duration: 5000,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
      <Toaster position="bottom-right" reverseOrder={false} />
    </NotificationContext.Provider>
  );
};

export default NotificationComponent;
