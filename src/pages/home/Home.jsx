import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/TableOrder";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  const [userCount, setUserCount] = useState(0); 
  const [productCount, setProductCount] = useState(0); 
  const [orderCount, setOrderCount] = useState(0); 
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const unsubuser = onSnapshot(collection(db, "Users"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      const count = list.length;
      setUserCount(count);
    });

    const unsubproduct = onSnapshot(collection(db, "Products"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      const count = list.length;
      setProductCount(count);
    });

    const unsuborder = onSnapshot(collection(db, "Orders"), (snapShot) => {
      let list = [];
      snapShot.docs.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      const count = list.length;

      let total = 0;
      for (let i = 0; i < list.length; i++) {
        total += list[i].totalprice;
      }
      setAmount(total);
      setOrderCount(count);
    });

    return () => {
      unsubuser();
      unsubproduct();
      unsuborder();
    };
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" total={userCount}/>
          <Widget type="product" total={productCount}/>
          <Widget type="order" total={orderCount}/>
          <Widget type="earning" total={amount}/>
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <List idacc={null}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
