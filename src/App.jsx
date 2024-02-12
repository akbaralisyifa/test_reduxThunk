import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProduct";
import ShowProduct from "./components/ShowProduct";
import EditProduct from "./components/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
