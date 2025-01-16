"use client";
import React from "react";
import ConversationSettingIcon from "@/public/conversation-setting.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

interface Props {
  title: string;
  conversationId: string;
}

const ConversationItemButton = ({ title, conversationId }: Props) => {
  const [isSettingConversation, setIsSettingConversation] = useState(false);

  return (
    <button
      onClick={() => {
        redirect(`/conversations/${conversationId}`);
      }}
      onMouseEnter={() => {
        setIsSettingConversation(true);
      }}
      onMouseLeave={() => {
        setIsSettingConversation(false);
      }}
      className="relative flex flex-row justify-between items-center p-2 hover:bg-gray-100 w-full text-left text-sm rounded-xl hover:cursor-default"
    >
      <p className="whitespace-normal max-w-48 line-clamp-2 overflow-hidden p-1">
        {title}
      </p>
      <Image
        src={ConversationSettingIcon}
        alt=""
        onClick={(event) => {
          event.stopPropagation();
          console.log("Clicked!");
        }}
        className={
          !isSettingConversation
            ? "hidden"
            : "hover:bg-gray-200 rounded-md hover:cursor-pointer"
        }
      />
    </button>
  );
};

export default ConversationItemButton;
