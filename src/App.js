import db from "./db/firebase";
import Home from "./Components/Home";
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
