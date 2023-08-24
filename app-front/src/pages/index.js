import styles from "./styles.module.css";

import { Navbar } from "@/components/Navbar";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import { FaRegComments } from "react-icons/fa";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [messageChat, setMessageChat] = useState([]);
  const [newMessageChat, setNewMessageChat] = useState("");

  const handleSendMessage = async (event) => {
    if (newMessageChat.trim() !== "") {
      try {
        await fetch("http://localhost:8080/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: newMessageChat }),
        });
        setMessageChat((state) => [...state, newMessageChat]);
        setNewMessageChat("");
      } catch (error) {
        console.log("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    socket.on("chat message", (message) => {
      setMessages((state) => [...state, message]);
    });
  }, []);


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Navbar />

      <div className={styles.container}>
        <ul>
          {messageChat.map((message, index) => (
            <li key={index} className={index % 2 === 0 ? styles.right : styles.left}>
              <FaRegComments size={32} color="var(--GREEN_700)"/> - {message}
            </li>
          ))}
        </ul>
        <div className={styles.formulario}>
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={newMessageChat}
            onChange={(e) => setNewMessageChat(e.target.value)}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </main>
  );
}
