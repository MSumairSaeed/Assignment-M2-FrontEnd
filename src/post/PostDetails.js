import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl } from '../constant.js';
const PostDetail = () => {
  const { postId } = useParams();
  const [commentsdata, setCommentsData] = useState(null);
  const navigate = useNavigate();

  const [postData, setPostData] = useState({});
  const LoadEdit = (id) => {
    navigate("/comments/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      };
      axios
        .delete(
          `${apiUrl}/Comments/deleteComment/${id}`,
           config)
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      },
    };
    axios
      .get(
        `${apiUrl}/Posts/getPost/${postId}`,
         config)
      .then((x) => {
        setPostData(x.data[0]);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>Post Details</h2>
          </div>
          <div className="card-body"></div>
          <div className="divbtn">
            <Link to={`/comments/create/${postId}`} className="btn btn-success">
              Add New (+)
            </Link>
          </div>  
          {postData && (
            <div>
              <h2>
                The Post name is : <b>{postData.name}</b> ({postData.postId})
              </h2>
              <h3>Comment Details</h3>
              <table className="table table-bordered">
                <thead className="bg-dark text-white">
                  <tr>
                    <td>CommentId</td>
                    <td>Title</td>
                    <td>Content</td>
                  </tr>
                </thead>
                <tbody>
                  {postData.comments &&
                    postData.comments.map((item) => (
                      <tr key={item.id}>
                        <td>{item.commentId}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td>
                          <a
                            onClick={() => {
                              LoadEdit(item.commentId);
                            }}
                            className="btn btn-success"
                          >
                            Edit
                          </a>
                          <a
                            onClick={() => {
                              Removefunction(item.commentId);
                            }}
                            className="btn btn-danger"
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Link className="btn btn-danger" to="/posts">
                Back to Listing
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
