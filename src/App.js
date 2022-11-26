import db from "./db/firebase";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
// import { colRef } from "./db/firebase";
// console.log(colRef);
function App() {
  return (
    <div className="App">
      <Home />
      <Footer />
    </div>
  );
}

export default App;
