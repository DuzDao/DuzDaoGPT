import React from "react";
import SidebarIcon from "@/public/sidebar.svg";
import ChatSearchIcon from "@/public/chat-search.svg";
import NewChatIcon from "@/public/new-chat.svg";
import Image from "next/image";
import UpgradeIcon from "@/public/upgrade.svg";
import UserIcon from "@/public/upgrade.svg";
import ExploreIcon from "@/public/explore.svg";
import ChatgptIcon from "@/public/chatgpt-logo.svg";
import ConversationItemButton from "../ConversationButton";
import { useRouter } from "next/navigation";

interface Conversation {
  id: string;
  title: string;
  updatedAt: string;
}

interface Props {
  conversations: Conversation[];
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
}

const SideBar = ({ conversations, isOpenSidebar, toggleSidebar }: Props) => {
  const router = useRouter();

  return (
    <div className={isOpenSidebar ? "" : "hidden"}>
      <div className="sidebar-modal p-2 outline outline-1 outline-gray-200 bg-white fixed top-0 left-0 w-72 flex flex-col h-screen">
        <div className="sidebar-header flex flex-row justify-between">
          <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-xl ">
            <Image src={SidebarIcon} alt="" onClick={toggleSidebar} />
          </div>
          <div className="flex flex-row">
            <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-xl">
              <Image src={ChatSearchIcon} alt="" />
            </div>
            <div className="hover:bg-gray-100 hover:cursor-pointer p-2 rounded-xl">
              <Image
                src={NewChatIcon}
                alt=""
                onClick={() => router.push("/conversations")}
              />
            </div>
          </div>
        </div>
        <div className="sidebar-body flex-grow mt-2 overflow-auto">
          <div className="first-section">
            <button
              onClick={() => router.push("/conversations")}
              className="flex w-full gap-3 hover:bg-gray-100 rounded-xl px-3 py-2"
            >
              <div className="outline outline-1 rounded-full p-0.5 outline-slate-300 bg-white">
                <Image src={ChatgptIcon} alt="" className="h-5 w-5"></Image>
              </div>
              <p>ChatGPT</p>
            </button>
            <button className="flex w-full gap-3 hover:bg-gray-100 rounded-xl px-3 py-2">
              <div className="rounded-full p-0.5">
                <Image src={ExploreIcon} alt="" className="h-5 w-5" />
              </div>
              <p>Explore GPTs</p>
            </button>
          </div>
          <div className="conversations-history mt-3">
            <ul>
              {conversations.map((conversation) => {
                return (
                  <li key={conversation.id} className="w-full">
                    <ConversationItemButton
                      title={conversation.title}
                      conversationId={conversation.id}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="sidebar-footer">
          <button className="flex flex-row items-center gap-2 hover:bg-gray-100 w-full px-3 py-2 rounded-xl">
            <div className="outline outline-1 rounded-full p-1 outline-gray-300">
              <Image src={UpgradeIcon} alt="" className="p-0.5" />
            </div>
            <div className="flex flex-col items-start">
              <h1>Upgrade plan</h1>
              <p className="text-xs text-gray-400">
                More access to the best models
              </p>
            </div>
          </button>
          <button className="flex flex-row items-center hover:bg-gray-100 w-full px-3 py-2 rounded-xl">
            <Image src={UserIcon} alt="" className="w-10 h-10 pb-1" />
            <p>DuzDao</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
