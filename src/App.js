import db from "./db/firebase";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Profile from "./Components/Profile";
import WriteReview from "./Components/WriteReview";
import AllPhotos from "./Components/AllPhotos";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/write" element={<WriteReview />} />
          <Route path="/profile/allphotos" element={<AllPhotos />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
