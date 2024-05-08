"use client";
import { app } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
const LikeSection = ({ id }) => {
  const { data: session } = useSession();
  const [hasLikes, setHasLikes] = useState(false);
  const [likes, setLikes] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    if (likes.findIndex((like) => like.id === session.user.uid) !== -1) {
      setHasLikes(true);
    } else {
      setHasLikes(false);
    }
  }, [likes]);

  const likePost = async () => {
    if (hasLikes) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  };
  return (
    <div>
      {session && (
        <div className="ml-4 mt-4 flex gap-2">
          {hasLikes ? (
            <HiHeart
              onClick={likePost}
              className="cursor-pointer text-red-500 text-2xl scale-125 transition duration-300 ease-out"
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className="cursor-pointer text-2xl hover:scale-125 transition duration-300 ease-out"
            />
          )}
          {likes.length > 0 && (
            <p>
              {likes.length} {likes.length === 1 ? "like" : "likes"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LikeSection;
