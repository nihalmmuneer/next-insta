"use client";
import { app } from "@/firebase";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Moment from "react-moment";
const CommentSection = ({ id }) => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  console.log(session);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: comment,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
    setComment("");
  };
  useEffect(() => {
    onSnapshot(query(collection(db, "posts", id, "comments"),orderBy("timestamp","desc")), (snapshot) => {
      setComments(snapshot.docs);
    });
  }, [db]);
  return (
    <div>
      <div className=" mx-10 max-h-20 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200" >
        {comments.length > 0 &&
          comments.map((comment) => (
            <div className="px-10 flex  pb-2 space-x-2 items-center">
              <img
                src={comment?.data().userImage}
                alt="comment"
                className="h-6 w-6 rounded-full"
              />
              <p className="font-bold text-sm">{comment?.data()?.username}</p>
              <p className="text-sm text-gray-600 flex-1">
                {comment?.data()?.comment}
              </p>
              <Moment fromNow className="text-xs text-gray-400 font-md">
                {comment?.data()?.timestamp?.toDate()}
            </Moment>
            </div>
          ))}
      </div>
      {session && (
        <div>
          <form
            className="p-4 flex items-center justify-between"
            onSubmit={handleSubmit}
          >
            <img
              src={session?.user?.image}
              alt={session?.user?.name}
              className="h-10 w-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 ml-2 focus:ring-0 outline-none"
            />
           
            <button
              disabled={!comment}
              className="disabled:text-gray-400 text-blue-500 font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
