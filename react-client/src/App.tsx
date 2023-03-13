import "./App.css";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPosts from "./pages/MyPosts";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import AddPosts from "./pages/AddPosts";
import ContactUs from "./pages/ContactUs";
import { AuthContextProvider } from "./context/Auth";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myposts" element={<MyPosts />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/addposts" element={<AddPosts />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
