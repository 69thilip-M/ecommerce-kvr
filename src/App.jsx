import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <BrowserRouter basename="/kmrvegetables">
      {" "}
      {/* ✅ use your repo name here */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
