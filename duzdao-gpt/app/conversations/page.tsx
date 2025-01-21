"use client";
import React from "react";
import AttachIcon from "@/public/file-attach.svg";
import WebSearchIcon from "@/public/web-search.svg";
import SendMessageIcon from "@/public/send-message.svg";
import Image from "next/image";
import { createNewConversation } from "../lib/actions";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const page = () => {
  const [userId, setUserId] = useState("");
  const [titleClick, setTitleClick] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserid = async () => {
      const session = await getSession();
      if (session) {
        await setUserId(session?.user.id);
      }
    };
    fetchUserid();
  }, []);

  const handleCreateNewConversation = () => {
    setTitleClick(!titleClick);
  };

  const [newConversationId, setNewConversationId] = useState("");
  useEffect(() => {
    async function createAndStartNewConversation() {
      const res = await createNewConversation(userId, "");
      console.log(res);
      setNewConversationId(await res.conversation.id);
    }

    if (titleClick) {
      createAndStartNewConversation();
    }
  }, [titleClick]);

  useEffect(() => {
    router.push(`/conversations/${newConversationId}`);
  }, [newConversationId]);

  return (
    <>
      <div className="conversation-body flex-grow overflow-auto p-4">
        <div className="flex flex-col gap-10 justify-center w-full items-center h-full">
          <h1 className="font-bold text-3xl">What can I help with?</h1>
          <div className="flex flex-wrap max-w-80 justify-center items-center flex-row gap-2">
            <button
              onClick={handleCreateNewConversation}
              className="bg-gray-100 px-3 py-1 rounded-2xl hover:brightness-90"
            >
              Coding
            </button>
          </div>
        </div>
      </div>
      <div className="conversation-footer flex flex-col">
        <div className="input-zone mx-3 px-3 py-2 bg-light-gray-branch flex flex-col gap-5 rounded-3xl">
          <textarea
            rows={3}
            className="resize-none bg-transparent outline-none mt-1"
            placeholder="Message something..."
            name="text"
          />
          <div className="support-buttons flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <Image src={AttachIcon} alt="" />
              <Image src={WebSearchIcon} alt="" />
            </div>
            <div>
              <button type="submit">
                <Image src={SendMessageIcon} alt="" />
              </button>
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
