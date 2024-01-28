import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { ArrowRight, LogIn } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { LuMessagesSquare } from "react-icons/lu";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }
  return (
    <div
      id="home-page"
      className="w-screen min-h-screen bg-gradient-to-t from-[#020308] to-[#191A1E]"
    >
      <div className="flex justify-between items-center px-8 pt-4">
        <div className="flex items-center justify-center px-3">
          <LuMessagesSquare className="mr-2 w-7 h-7 text-[#3BA764]" />
          <Link href="/">
            <h1 className="text-2xl font-bold font-sans text-[#3BA764]">
              AssistBin
            </h1>
          </Link>
        </div>
        <div className={userId ? "bg-green-500 p-1 rounded-full" : ""}>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="">
            <h1 className="mr-3 text-6xl font-bold bg-gradient-to-r from-white via-green-500 to-white inline-block text-transparent bg-clip-text">
              Chat with AssistBin
            </h1>
          </div>
          <h3 className="text-white my-2">By Dropping PDF</h3>

          <div className="flex mt-2">
            {isAuth && (
              <>
                <Link href={`/chat/${firstChat?.id}`}>
                  <Button className="bg-[#42c273]">
                    Go to Chats <ArrowRight className="ml-2" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-gray-300">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button className="bg-green-500">
                  Login to get Started!
                  <LogIn className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
