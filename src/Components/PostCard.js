import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { useAuth } from "../contexts/AuthContext";

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("studyBuddies")
      .delete()
      .eq("id", post.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(post.id);
    }
  };

  return (
    <div className="post-card">
      <h3>{post.postTitle}</h3>
      <p>{post.contactInfo}</p>
      <p>{post.description}</p>
      <div className="course-name">
        {post.courseDpt}
        {post.courseCode}
      </div>
      <div className="buttons">
        {user.email === post.userId && (
          <Link to={"/" + post.id}>
            <i className="material-icons">edit</i>
          </Link>
        )}
        {user.email === post.userId && (
          <i className="material-icons" onClick={handleDelete}>
            delete
          </i>
        )}
      </div>
    </div>
  );
};

export default PostCard;
