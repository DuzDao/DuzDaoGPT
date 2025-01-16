import Image from "next/image";
import SideBarIcon from "@/public/sidebar.svg";
import ModelSelectIcon from "@/public/select-model.svg";
import NewChatIcon from "@/public/new-chat.svg";
import AttachIcon from "@/public/file-attach.svg";
import WebSearchIcon from "@/public/web-search.svg";
import SendMessageIcon from "@/public/send-message.svg";
import SideBar from "../components/ui/SideBar";

export default function ConversationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conversations = [
    { id: "1", title: "conversation 1", updatedAt: "10h" },
    { id: "2", title: "conversation 2", updatedAt: "10h" },
    { id: "3", title: "conversation 3", updatedAt: "10h" },
    { id: "4", title: "conversation 4", updatedAt: "10h" },
    {
      id: "5",
      title: "This conversation title is quite long",
      updatedAt: "10h",
    },
  ];
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="conversation-header px-4 pt-4 flex flex-row w-full justify-between">
        <div className="sidebar">
          <Image src={SideBarIcon} alt="" />
          <SideBar conversations={conversations} />
        </div>
        <div className="model-selection flex flex-row">
          <p>ChatGPT</p>
          <Image src={ModelSelectIcon} alt=""></Image>
        </div>
        <div className="new-chat">
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
