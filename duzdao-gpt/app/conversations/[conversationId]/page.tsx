"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getMessages } from "@/app/lib/actions";
import { appendNewMessageFromUser } from "@/app/lib/actions";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  const conversationId = params.conversationId as string;
  const [messages, setMessages] = useState<any[]>([]);
  const [firstTimeFetchMessages, setFirstTimeFetchMessages] = useState(true);
  const [newMessageFromUser, setNewMessageFromUser] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      if (newMessageFromUser != "") {
        await appendNewMessageFromUser(conversationId, newMessageFromUser);
        setNewMessageFromUser("");
      }
      const fetchedMessages = await getMessages(conversationId);
      setMessages(fetchedMessages.messages);
    };
    fetchMessages();
  }, [firstTimeFetchMessages, newMessageFromUser]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  if (firstTimeFetchMessages) {
    setFirstTimeFetchMessages(false);
  }

  const handleSendMessage = (data: FormData) => {
    const userMessage = data.get("message");
    if (userMessage) {
      setNewMessageFromUser(userMessage?.toString());
    }
  };

  return (
    <div>
      <h1>This page contain messages of a conversation id</h1>
      <h1>Lets chat:</h1>
      <form action={handleSendMessage}>
        <input type="text" name="message" placeholder="message..." />
        <button type="submit">Submit</button>
      </form>

      <h1>History chat:</h1>
      <ul>
        {messages.map((message) => (
          <li>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default page;
