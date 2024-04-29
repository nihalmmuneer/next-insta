import Image from "next/image";
import Link from "next/link";

const Header = () => {
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
          placeholder="Search.."
          className="border py-3 px-3 border-gray-200 rounded-lg"
        />
        {/* button */}
        <button className="text-blue-400 text-sm font-bold">Log In</button>
      </div>
    </div>
  );
};

export default Header;
