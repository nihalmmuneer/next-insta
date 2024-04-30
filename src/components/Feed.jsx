import MiniPosts from "./MiniPosts";
import Posts from "./Posts";

const Feed = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
    {/* Post */}
      <section className="md:col-span-2">
        <Posts />
      </section>
      <section className=" hidden md:col-span-1 md:inline-grid">
      {/* MiniProfile */}
        <MiniPosts />
      </section>
    </main>
  );
};

export default Feed;
