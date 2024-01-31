import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Components/index.jsx";
import ExpenseTracker from "./Components/ExpenseTracker.jsx";
function App() {
  return (
    <>
      <div className="">
        <Router>
          <Routes>
            <Route path="/" exact element={<Index />} />
            <Route path="/expense" exact element={<ExpenseTracker />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
