import "./detailorder.scss";
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
  updateDoc,
} from "firebase/firestore";
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const DetailOrder = () => {
  const location = useLocation();   
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [order, setOrder] = useState([]);   
  const [customer, setCustomer] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const unsuborder = onSnapshot(doc(db, "Orders", id), (doc) => {
      const orderData = doc.data();
      setOrder(orderData);
      const object = orderData.product.reduce((result, item, index) => {
        result[index] = item;
        return result;
      }, {});
      setProduct(object);
    });  
    
    // const unsubcus = onSnapshot(doc(db, "Users", order.idacc), (doc) => {
    //   setCustomer(doc.data());
    // });  
  
    return () => {
      unsuborder();
    };
  }, []);

  // console.log("Current data: ", order);
  useEffect(() => {
    if (order.idacc) {
      const unsubcus = onSnapshot(doc(db, "Users", order.idacc), (doc) => {
        setCustomer(doc.data());
        setSelectedOption({value: order.status, label: order.status});
      });  
      
      return () => {
        unsubcus();
      };
    }
  }, [order]);
  // console.log("Cus data: ", customer);
  // console.log("Pro data: ", product);

  const Status = [
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Canceled', label: 'Canceled' },
  ];

  
  console.log(selectedOption);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    updateStatusInFirebase(id, selectedOption.value)
  };

  const updateStatusInFirebase = async (docId, newStatus) => {
    try {
      const orderRef = doc(db, "Orders", docId);
  
      await updateDoc(orderRef, {
        status: newStatus,
      });
  
      console.log("Status updated in Firebase.");
    } catch (error) {
      console.log("Error updating status in Firebase:", error);
    }
  };

  return (
    <div className="detailorder">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={order.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{order.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Order ID:</span>
                  <span className="itemValue">{id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Quantity:</span>
                  <span className="itemValue">
                    {order.totalquantity}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Total Price:</span>
                  <span className="itemValue">$ {order.totalprice}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <Select className="itemValue"
                          options={Status} 
                          value={selectedOption} 
                          onChange={handleSelectChange}/>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" /> */}
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Detail Order</h1>
          <List items={product}/>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
