import "./detailproduct.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/TableProduct";
import { useLocation } from 'react-router-dom';
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailProduct = () => {
  const location = useLocation();   
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const unsuborder = onSnapshot(doc(db, "Products", id), (doc) => {
      setProduct(doc.data());
    });    
  
    return () => {
      unsuborder();
    };
  }, []);

  console.log("Pro data: ", product);


  return (
    <div className="detailproduct">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={product.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{product.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Product ID:</span>
                  <span className="itemValue">{product.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">
                    {product.category}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">$ {product.price}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{product.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>
        {/* <div className="bottom">
        <h1 className="title">Detail Order</h1>
          <List items={product}/>
        </div> */}
      </div>
    </div>
  );
};

export default DetailProduct;
