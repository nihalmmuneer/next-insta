import {
  collection,
  getFirestore,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { app } from "@/firebase";
import Post from "./Post";

const Posts = async () => {
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamps", "desc"));
  console.log(q);
  const querySnapshot = await getDocs(q);
  let data = [];
  console.log(querySnapshot, "querySnapshot");
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  console.log(data, "data");
  return <div>
    {data && data.map((post)=>(
      <Post key={post.id} post={post}/>
    ))}
  </div>;
};

export default Posts;
