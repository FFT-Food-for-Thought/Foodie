import Home from "./pages/Home";
// import "./style.scss";
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
          <Route
            path=""
            index
            element={
              // <ProtectedRoute>
              <Home />
              // </ProtectedRoute>
            }
          />
          {/* <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
