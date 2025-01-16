"use client";

import Image from "next/image";
import SideBarIcon from "@/public/sidebar.svg";
import ModelSelectIcon from "@/public/select-model.svg";
import NewChatIcon from "@/public/new-chat.svg";
import AttachIcon from "@/public/file-attach.svg";
import WebSearchIcon from "@/public/web-search.svg";
import SendMessageIcon from "@/public/send-message.svg";
import SideBar from "../components/ui/SideBar";
import { useState, useEffect } from "react";
import { getConversations } from "../lib/actions";
import { getSession } from "next-auth/react";

export default function ConversationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userId, setUserId] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  useEffect(() => {
    const fetchUserid = async () => {
      const session = await getSession();
      if (session) {
        setUserId(session?.user.id);
      }
    };
    fetchUserid();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      const res = await getConversations(userId);
      await setConversations(res.conversations);
    };
    fetchConversation();
  }, [userId]);

  const [isOpenSidebar, setIsOpenSideBar] = useState(false);
  const toggleSidebar = () => {
    setIsOpenSideBar(!isOpenSidebar);
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="conversation-header px-2 pt-2 flex flex-row w-full justify-between">
        <div className="sidebar">
          <div className="p-2 hover:bg-gray-100 hover:cursor-pointer rounded-xl">
            <Image src={SideBarIcon} alt="" onClick={toggleSidebar} />
          </div>
          <SideBar
            conversations={conversations}
            isOpenSidebar={isOpenSidebar}
            toggleSidebar={toggleSidebar}
          />
        </div>
        <div className="model-selection flex flex-row p-2 hover:bg-gray-100 hover:cursor-pointer rounded-xl">
          <p>ChatGPT</p>
          <Image src={ModelSelectIcon} alt=""></Image>
        </div>
        <div className="new-chat p-2 hover:bg-gray-100 hover:cursor-pointer rounded-xl">
          <Image src={NewChatIcon} alt=""></Image>
        </div>
      </div>
      <div className="conversation-body flex-grow">{children}</div>
      <div className="conversation-footer flex flex-col">
        <div className="input-zone mx-3 px-3 py-2 bg-light-gray-branch flex flex-col gap-5 rounded-3xl">
          <input
            type="text"
            className="bg-transparent outline-none mt-1"
            placeholder="Message something..."
          />
          <div className="support-buttons flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <Image src={AttachIcon} alt="" />
              <Image src={WebSearchIcon} alt="" />
            </div>
            <div>
              <Image src={SendMessageIcon} alt="" />
            </div>
          </div>
        </div>
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
    </div>
  );
}
