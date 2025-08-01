import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/category" element={<Category />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </BrowserRouter>
      <Toaster></Toaster>
    </>
  );
};

export default App;
