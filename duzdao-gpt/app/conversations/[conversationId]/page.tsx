"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getMessages } from "@/app/lib/actions";
import { appendNewMessageFromUser } from "@/app/lib/actions";
import { useParams } from "next/navigation";
import Image from "next/image";
import AttachIcon from "@/public/file-attach.svg";
import WebSearchIcon from "@/public/web-search.svg";
import SendMessageIcon from "@/public/send-message.svg";
import UserMessage from "@/app/components/UserMessage";

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
    <>
      <div className="conversation-body flex-grow overflow-auto ms-4 me-6">
        <ul>
          {messages.map((message) =>
            message.role === "user" ? (
              <UserMessage id={message.id} content={message.content} />
            ) : (
              <li>Model response</li>
            )
          )}
        </ul>
      </div>
      <div className="conversation-footer flex flex-col">
        <form action={handleSendMessage}>
          <div className="input-zone mt-3 mx-3 px-3 py-2 bg-light-gray-branch flex flex-col gap-5 rounded-3xl">
            <input
              type="text"
              name="message"
              className="bg-transparent outline-none mt-1"
              placeholder="Message something..."
            />
            <div className="support-buttons flex flex-row justify-between">
              <div className="flex flex-row items-center">
                <div className="hover:bg-gray-200 rounded-2xl p-1 hover:cursor-pointer">
                  <Image src={AttachIcon} alt="" />
                </div>
                <div className="hover:bg-gray-200 rounded-2xl p-1 hover:cursor-pointer">
                  <Image src={WebSearchIcon} alt="" />
                </div>
              </div>
              <button
                type="submit"
                className="hover:bg-gray-200 rounded-full hover:cursor-pointer"
              >
                <Image src={SendMessageIcon} alt="" />
              </button>
            </div>
          </div>
        </form>
        <div className="note self-center">
          <p className="text-xs my-1">
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>
        <div className="faq fixed right-0 bottom-0">
          <p className="w-5 h-5 flex items-center justify-center rounded-full align-middle outline outline-1 m-1 hover:bg-slate-100 hover:cursor-pointer">
            ?
          </p>
        </div>
      </div>
    </>
    // <div className="flex flex-col">
    //   <h1>This page contain messages of a conversation id</h1>
    //   <h1>Lets chat:</h1>
    //   <form action={handleSendMessage}>
    //     <input type="text" name="message" placeholder="message..." />
    //     <button type="submit">Submit</button>
    //   </form>

    //   <h1>History chat:</h1>
    //   <ul>
    //     {messages.map((message) => (
    //       <li key={message.id}>{message.content}</li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default page;
