import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext, { AuthContextType } from "../context/Auth";

const Profile = () => {
  const auth = useContext(AuthContext) as AuthContextType;

  const [firstName, setFirstName] = useState(auth.user.firstName);
  const [lastName, setLastName] = useState(auth.user.lastName);
  const [email, setEmail] = useState(auth.user.username);
  const [id] = useState(auth.user._id);

  const navigate = useNavigate();

  const updateAccount = () => {
    axios({
      method: "PUT",
      withCredentials: true,
      url: `http://localhost:4000/api/update-user/${id}`,
      data: {
        fname: firstName,
        lname: lastName,
        email: email,
      },
    }).then((res) => {
      console.log(res);
      navigate("/profile");
    });
  };

  const deleteAccount = () => {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:4000/api/delete-user/${id}`,
    }).then((res) => {
      console.log(res);
      auth.logout();
      navigate("/");
    });
  };

  useEffect(() => {}, [firstName, lastName, email]);

  return (
    <div className="Profile">
      <h1>Profile</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="fname">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            id="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lname">Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            id="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-success mr-5" onClick={updateAccount}>
            Save Changes
          </button>

          <button className="btn btn-danger" onClick={deleteAccount}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
