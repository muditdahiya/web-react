import { useContext, useState } from "react";
import AuthContext, { AuthContextType } from "../context/Auth";

const Profile = () => {
  const auth = useContext(AuthContext) as AuthContextType;

  const [firstName, setFirstName] = useState(auth.user.firstName);
  const [lastName, setLastName] = useState(auth.user.lastName);
  const [email, setEmail] = useState(auth.user.username);

  const updateAccount = () => {
    console.log("====================================");
    console.log("Account updated");
    console.log(`Full name >>>> ${firstName} ${lastName}`);
    console.log(`Email >>> ${email}`);

    console.log("====================================");
  };

  const deleteAccount = () => {
    console.log("====================================");
    console.log("Account deleted");
    console.log("====================================");
  };

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
