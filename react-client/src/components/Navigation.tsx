import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="Navigation">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* logo */}
        <span className="navbar-brand">
          <img src="logo512.png" alt="logo" height={"60px"} />
        </span>

        {/* button for responsive design */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* navigation bar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Login">
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/myposts">
                My Posts
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favourites">
                Favourites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contactus">
                ContactUs
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
