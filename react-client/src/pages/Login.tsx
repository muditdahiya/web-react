import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 


type PostType = {
  email: string;
  password: string;
};
type UserType = {
  email: string;
  token: string;
};


const Login = () => {
  const [loginData, setLoginData] = useState<PostType>({ email: "", password: "" });
  // const [logindb, setLogindb] = useState<PostType>({ email: "", password: "" });
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/');

    let formValid = true;
    if (formValid) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      let data = {
        email: loginData.email,
        password: loginData.password,
      };

      
       await axios.post("http://localhost:4000/login", data,config).then((res) => {
      if (res.data != null) {
        // console.log(res.data.email);
        console.log(res.data.token);
        // setLogindb(res.data);
        // console.log(logindb);
        // console.log(loginData);
        localStorage.setItem("token", res.data.token);
          console.log("User verified");
        } else {
        console.log("Error: no data returned from server");
      }
    });
  };
};
    
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <form className="Login" onSubmit={onSubmit}>
      <h3><b>Sign In</b></h3>

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
        Forgot <a href="/signup">password?</a>
      </p>
    </form>
    
  );
};

export default Login;