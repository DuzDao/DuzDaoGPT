"use client";

import Image from "next/image";
import SideBarIcon from "@/public/sidebar.svg";
import ModelSelectIcon from "@/public/select-model.svg";
import NewChatIcon from "@/public/new-chat.svg";

import SideBar from "../components/ui/SideBar";
import { useState, useEffect } from "react";
import { getConversations } from "../lib/actions";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ConversationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userId, setUserId] = useState("");
  const [conversations, setConversations] = useState<any[]>([]);
  const router = useRouter();

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
          <Image
            src={NewChatIcon}
            alt=""
            onClick={() => router.push("/conversations")}
          ></Image>
        </div>
      </div>
      {children}
    </div>
  );
}
