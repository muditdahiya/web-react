import axios from "axios";
import React, { useState, useContext } from "react";
import AuthContext, { AuthContextType } from "../context/Auth";
import { useNavigate } from "react-router-dom";

type PostType = {
  fname: string;
  lname: string;
  email: string;
  password: string;
};

const Signup = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const [signupData, setSignupData] = useState<PostType[]>([]);
  const navigate = useNavigate();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/signup",
        signupData,
        config
      );
      console.log(response);
      navigate("/login");
    } catch (e: any) {
      console.log("error ", e.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  return (
    <div className="Signup">
      <form onSubmit={onSubmit}>
        <h3>
          <b>Sign Up</b>
        </h3>

        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="fname"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lname"
            onChange={handleChange}
          />
        </div>

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
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
