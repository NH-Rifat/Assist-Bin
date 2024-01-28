"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { LuMessagesSquare } from "react-icons/lu";
// import SubscriptionButton from "./SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro?: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="w-full h-full p-5 text-gray-200 bg-[#201F1F]">
      <div className="flex items-center justify-center px-3 pb-12">
        <LuMessagesSquare className="mr-2 w-7 h-7 text-[#3BA764]" />
        <Link href="/">
          <h1 className="text-2xl font-bold font-sans text-[#3BA764]">
            AssistBin
          </h1>
        </Link>
      </div>
      <Link href="/">
        <Button className="w-full border-white bg-[#3BA764]">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex  pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn(
                "rounded-lg p-2 text-slate-300 flex items-center  hover:bg-[#3BA764] hover:text-white",
                {
                  "bg-[#3BA764] text-white flex items-center justify-center":
                    chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                }
              )}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
