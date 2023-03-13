import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from "../context/Auth";

type PostType = {
  email: string;
  password: string;
};
type UserType = {
  email: string;
  token: string;
};

const Login = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const [loginData, setLoginData] = useState<PostType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formValid = true;
    if (formValid) {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let data = {
        email: loginData.email,
        password: loginData.password,
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          data,
          config
        );
        console.log(response);

        if (response.data !== false) {
          console.log(response.data);
          localStorage.setItem("token", response.data.token);
          const user = {
            username: response.data.email,
            firstName: response.data.fname,
            lastName: response.data.lname,
          };
          console.log(user);
          auth.setUser(user);
          auth.login();
          navigate("/");
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <form className="Login" onSubmit={onSubmit}>
      <h3>
        <b>Sign In</b>
      </h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        <a href="/signup">New User?</a>
      </p>
    </form>
  );
};

export default Login;
