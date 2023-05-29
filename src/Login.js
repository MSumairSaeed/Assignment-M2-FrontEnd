import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from './constant.js';

const Login = () => {
  const [email, emailchange] = useState("");
  const [password, passwordchange] = useState("");
  const [showError, setShowError] = useState(true);
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    axios    
      .post(
        `${apiUrl}/Auth/Login`, 
        {
        email: userData.email,
        password: userData.password,
      })
      .then((x) => {
        if (x.data === "User Not Found") {
          setShowError(false);
          setTimeout(function () {
            setShowError(true);
          }, 5000);

          return;
        }
        window.localStorage.setItem("token", x.data);
        navigate("/posts");
      })
      .catch((x) => {
        console.log(x);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2>Login</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                      type="password"
                        value={password}
                        onChange={(e) => passwordchange(e.target.value)}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button className="btn btn-success" type="submit">
                        Login
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                    <Link to="/SignUp" className="btn btn-primary">
                      Go TO Sign Up Page
                    </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="alert alert-danger" role="alert" hidden={showError}>
        User Not found
      </div>
    </div>
  );
};

export default Login;
