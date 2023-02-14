import "./App.css";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MyPosts from "./pages/MyPosts";
import Favourites from "./pages/Favourites";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
<<<<<<< HEAD
import SignUp from "./pages/Signup";
=======
import AddPosts from "./pages/AddPosts";
>>>>>>> db98673c23556277349a7fccd2238c371ea6866b

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
<<<<<<< HEAD
=======
        <Route path="/Login" element={<Login />} />
        <Route path="/addposts" element={<AddPosts />} />
>>>>>>> db98673c23556277349a7fccd2238c371ea6866b
      </Routes>
    </div>
  );
}

export default App;
