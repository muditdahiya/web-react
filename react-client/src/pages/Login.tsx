import React, { useState, useContext } from "react"; //imports
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from "../context/Auth";

type PostType = {               //defining type in typescript with required fields
  email: string;
  password: string;
};
type UserType = {
  email: string;
  token: string;
};

const Login = () => {                           //functional component called login using two hooks
  const auth = useContext(AuthContext) as AuthContextType;
  const [loginData, setLoginData] = useState<PostType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); //using navigate hook

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {   //onsubmit function
    e.preventDefault();

    let formValid = true;         //for jwt giving headers
    if (formValid) {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let data = {                     //storing into data variable
        email: loginData.email,
        password: loginData.password,
      };

      try { 
        const response = await axios.post(     //using axios for fetching the data
          "http://localhost:4000/login",
          data,
          config
        );
        console.log(response);

        if (response.data !== false) {
          // console.log(response.data);
          localStorage.setItem("token", response.data.token);    //putting the token into localStorage
          const user = {
            username: response.data.email,
            firstName: response.data.fname,
            lastName: response.data.lname,
          };
          // console.log(user);
          auth.setUser(user);
          auth.login();          //when user is authenticated then he can login and navigate to home
          navigate("/");
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {   //handleChange function
    const { name, value } = e.target;
    setLoginData((prevData) => {
      return { ...prevData, [name]: value };    //this function is used to update the state of loginData variable when user types input fields
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
