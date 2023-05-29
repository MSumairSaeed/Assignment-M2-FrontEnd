import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from '../constant.js';

const PostListing = () => {
  const [postdata, setPostData] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/posts/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/posts/edit/" + id);
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
          `${apiUrl}/Posts/deletePost/${id}`,
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
    axios.get(
      `${apiUrl}/Posts/GetAllPosts`,
       config).then((x) => {
      setPostData(x.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Posts Listing</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="create" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>PostId</td>
                <td>Name</td>
              </tr>
            </thead>
            <tbody>
              {postdata &&
                postdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.postId}</td>
                    <td>{item.name}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.postId);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.postId);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.postId);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostListing;
