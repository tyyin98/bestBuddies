import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//components
import PostCard from "../Components/PostCard";
import { useAuth } from "../contexts/AuthContext";
// search

// before search
const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [descending, setDescending] = useState(true);
  const [searchDpt, setSearchDpt] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(null);
  const { user, isAuthenticated } = useAuth();

  const [userPostsOnly, setUserPostsOnly] = useState(null);

  const toggleState = () => {
    setUserPostsOnly((prevState) => (prevState === null ? user.email : null));
  };

  const handleSearchDpt = (event) => {
    const query = event.target.value;
    setSearchDpt(query);
    if (query === "") {
      setFilteredPosts(null);
      return;
    }

    const filtered = posts.filter((post) =>
      post.courseName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(() => filtered);
  };

  const handleDelete = (id) => {
    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== id);
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = userPostsOnly
        ? await supabase
            .from("studyBuddies")
            .select()
            .eq("userId", userPostsOnly)
            .order("created_at", { ascending: !descending })
        : await supabase
            .from("studyBuddies")
            .select()
            .order("created_at", { ascending: !descending });

      if (error) {
        setFetchError("Could not fetch the posts");
        setPosts(null);
        console.log(error);
      }
      if (data) {
        setPosts(data);
        setFetchError(null);
      }
    };

    fetchPosts();
  }, [descending, userPostsOnly]);

  return (
    <div className="page home">
      <div className="post-title">
        <h1>Active Posts</h1>
      </div>

      <input
        type="text"
        placeholder="🔍 Search Courses..."
        value={searchDpt}
        onChange={handleSearchDpt}
      />

      {fetchError && <p>{fetchError}</p>}
      {filteredPosts && (
        <div className="posts">
          <div className="order-by">
            <p></p>
            <button onClick={() => setDescending(!descending)}>
              {descending ? "Earliest posts" : "Latest posts"}
            </button>
            {/* <button onClick={() => setOrderBy("courseDpt")}>Subject </button> */}
            <button onClick={toggleState}>
              {userPostsOnly === null ? "Show my posts" : "Show all posts"}
            </button>
          </div>
          <div className="post-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
      {!filteredPosts && posts && (
        <div className="posts">
          <div className="order-by">
            <p></p>
            <button onClick={() => setDescending(!descending)}>
              {descending ? "Earliest posts" : "Latest posts"}
            </button>
            {/* <button onClick={() => setOrderBy("courseDpt")}>Subject </button> */}
            <button onClick={toggleState}>
              {userPostsOnly === null ? "Show my posts" : "Show all posts"}
            </button>
          </div>
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}
      {isAuthenticated && (
        <Link to="/create" className="createButtonSml">
          <span>✏️</span>
        </Link>
      )}
    </div>
  );
};

export default Home;
