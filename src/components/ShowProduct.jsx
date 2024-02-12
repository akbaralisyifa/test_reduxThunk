// import React from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProducts,
  getProducts,
  productSelectors,
} from "../redux/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const products = useSelector(productSelectors.selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div style={{ width: "50%" }}>
      <Link to={"/add"}>Add Product</Link>
      <p>Show Product</p>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>Title : {product.title}</td>
              <td> Price : {product.price}</td>
              <td>
                <Link to={`/edit/${product.id}`}>Edit</Link>
                <button onClick={() => dispatch(deleteProducts(product.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProduct;
