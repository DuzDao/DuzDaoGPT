"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getMessages } from "@/app/lib/actions";
import { appendNewMessageFromUser } from "@/app/lib/actions";

const page = () => {
  const [userMessage, setUserMessage] = useState("");
  const [newMessageCome, setNewMessageCome] = useState(false);
  const conversationId = "cm5vxc9j50001hdn0zwq8c279";

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(conversationId);
      console.log(messages);
      return messages.messages;
    };
    fetchMessages();
  }, [newMessageCome]);

  const handleNewMessageFromUser = () => {
    appendNewMessageFromUser(conversationId, userMessage);
    setNewMessageCome(!newMessageCome);
  };

  return (
    <div>
      <h1>This page contain messages of a conversation id</h1>
      <h1>Lets chat:</h1>
      <form onSubmit={handleNewMessageFromUser}>
        <label htmlFor="userMessage">message something</label>
        <input
          type="text"
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          value={userMessage}
        />
        <button type="submit">Submit</button>
      </form>

      <h1>History chat:</h1>
    </div>
  );
};

export default page;
