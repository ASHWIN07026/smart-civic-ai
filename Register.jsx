import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

let socketInstance = null;

export const useSocket = () => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
        transports: ["websocket"],
      });
    }
    socketRef.current = socketInstance;

    return () => {
      // Don't disconnect on unmount — keep singleton alive
    };
  }, []);

  return socketRef.current || socketInstance;
};
