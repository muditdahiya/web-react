import "./App.css";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPosts from "./pages/MyPosts";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AddPosts from "./pages/AddPosts";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="addposts" element={<AddPosts />} />
      </Routes>
    </div>
  );
}

export default App;
