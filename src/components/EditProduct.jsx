// import React from 'react'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  productSelectors,
  updateProducts,
} from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const product = useSelector((state) =>
    productSelectors.selectById(state, id)
  );

  console.log(product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    await dispatch(updateProducts({ id, title, price }));
    navigate("/");
  };

  return (
    <div style={{ width: "50%" }}>
      <p>Edit Product</p>

      <form onSubmit={handleUpdate}>
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

        <button type="submit">Edit Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
