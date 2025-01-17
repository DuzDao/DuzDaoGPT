"use client";
import React from "react";
import AttachIcon from "@/public/file-attach.svg";
import WebSearchIcon from "@/public/web-search.svg";
import SendMessageIcon from "@/public/send-message.svg";
import Image from "next/image";
const page = () => {
  return (
    <>
      <div className="conversation-body flex-grow overflow-auto p-4">
        <h1>This will get us a new conversations</h1>
      </div>
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
    </>
  );
};

export default page;
