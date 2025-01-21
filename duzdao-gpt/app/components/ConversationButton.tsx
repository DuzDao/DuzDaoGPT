"use client";
import React from "react";
import DeleteIcon from "@/public/delete.svg";
import RenameIcon from "@/public/rename.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { deleteConversation } from "../lib/actions";

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
      <div className="flex flex-row gap-2 items-center justify-center">
        <Image
          src={RenameIcon}
          alt=""
          onClick={(event) => {
            event.stopPropagation();
            console.log("Rename!");
          }}
          className={
            !isSettingConversation
              ? "hidden"
              : "hover:bg-gray-200 size-5 rounded-md hover:cursor-pointer"
          }
        />
        <Image
          src={DeleteIcon}
          alt=""
          onClick={(event) => {
            event.stopPropagation();
            const res = deleteConversation(conversationId);
            console.log(res);
          }}
          className={
            !isSettingConversation
              ? "hidden"
              : "hover:bg-gray-200 rounded-md hover:cursor-pointer"
          }
        ></Image>
      </div>
    </button>
  );
};

export default ConversationItemButton;
