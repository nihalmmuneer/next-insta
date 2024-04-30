"use client";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { IoAddCircleOutline, IoCamera, IoClose } from "react-icons/io5";
import { useState } from "react";
import Modal from "react-modal";

const Header = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className=" border-b p-3 shadow-sm">
      <div className="flex justify-between items-center  max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden sm:inline">
          <Image
            src="/insta-text-logo.png"
            width={100}
            height={100}
            alt="insta-text-logo"
          />
        </Link>
        <Link href="/" className="sm:hidden">
          <Image
            src="/insta-logo.webp"
            alt="insta-logo"
            width={60}
            height={60}
          />
        </Link>

        {/* search */}
        <input
          type="text"
          placeholder="Search..."
          className="border py-3 px-3 border-gray-200 rounded-lg"
        />
        <div className="flex items-center gap-4">
          <IoAddCircleOutline
            onClick={() => setIsOpen(true)}
            className="w-8 h-8 hover:text-red-500 cursor-pointer hover:scale-125 transition duration-300"
          />
          {/* button */}
          {session ? (
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => signOut()}
            />
          ) : (
            <button
              onClick={() => signIn()}
              className="text-blue-400 text-sm font-bold cursor-pointer"
            >
              Log In
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        className="w-[90%] mx-auto outine-none absolute top-56 left-[50%] p-6  translate-x-[-50%] max-w-lg rounded-md shadow-lg"
        onRequestClose={() => setIsOpen(false)}
        // ariaHideApp={false}
      >
        <div className="flex flex-col justify-center  items-center">
          <IoCamera className="text-5xl text-center justify-center text-slate-400" />
          <input
            type="text"
            placeholder="Please enter your caption..."
            className="p-2 focus:outline-none"
          />
          <button className="disabled:bg-gray-100 disabled:cursor-not-allowed cursor-pointer bg-red-700 hover:bg-red-500 font-semibold w-full p-2 rounded-lg text-white uppercase mt-2">
            Upload Post
          </button>
          <IoClose
            className="absolute top-2 right-2 text-xl cursor-pointer hover:text-red-500 trasition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Header;
