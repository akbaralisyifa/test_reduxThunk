// import React from 'react'

import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveProducts } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    try {
      await dispatch(saveProducts({ title, price }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "50%" }}>
      <p>Add Product</p>

      <form onSubmit={handleSubmitProduct}>
        <label>
          Title :
          <input
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title product"
          />
        </label>

        <label>
          Price :
          <input
            type="text"
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="price product"
          />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
