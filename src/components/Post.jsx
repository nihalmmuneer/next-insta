import { BsThreeDotsVertical } from "react-icons/bs";
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";
const Post = ({ post }) => {
  console.log(post, "post");
  return (
    <div className="border my-7 border-slate-200">
      <div className="p-5 flex items-center">
        <img
          src={post?.profileImg}
          alt={post.userame}
          className="rounded-full h-12 p-1 border"
        />
        <p className="text-sm font-bold flex-1 ml-3">{post.username}</p>
        <BsThreeDotsVertical />
      </div>
      <img src={post?.uploadImg} alt={post?.caption} className="object-cover" />

      <LikeSection id={post.id} />
      <div className="flex gap-2 p-5">
        <span className="text-sm font-bold">{post?.username}</span>
        <p className="text-sm">{post?.caption}</p>
      </div>
      <CommentSection id={post.id} />
    </div>
  );
};

export default Post;
