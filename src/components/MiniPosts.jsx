"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const MiniPosts = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center mt-16 justify-between w-[280px]">
      <div className="flex gap-2 items-center justify-center">
        <img
          src={session?.user?.image || "insta-logo.webp"}
          alt="profileImg"
          className="w-12 h-12 rounded-full"
        />
        <div>
          {session && <h2 className="font-bold">{session?.user?.username}</h2>}
          <h1 className="text-gray-400 whitespace-nowrap text-sm">
            Welcome to Instagram
          </h1>
        </div>
      </div>
      {session ? (
        <button
          onClick={() => signOut()}
          className="font-extrabold text-blue-400 text-sm cursor-pointer whitespace-nowrap "
        >
          Sign Out
        </button>
      ) : (
        <button
          className="font-bold text-blue-500 cursor-pointer text-sm"
          onClick={() => signIn()}
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default MiniPosts;
