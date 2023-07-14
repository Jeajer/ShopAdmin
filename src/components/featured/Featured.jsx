import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query, 
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

const Featured = () => {
  const [amount, setAmount] = useState([]);
  const [data, setData] = useState([]);
  const today = new Date();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const Revenue = () => {
    const totalDate = calculateTotalPriceForDay(today);
    const percent = totalDate / 500 * 100;
    return percent;
  }


  const calculateTotalPriceForDay = (date) => {
    // Chuyển đổi ngày thành timestamp để so sánh với trường 'time' trong mảng dữ liệu
    const dateTimestamp = date.getTime() / 1000;
  
    // Duyệt qua từng đối tượng trong mảng và tính tổng tiền
    let totalPrice = 0;
    data.forEach((item) => {
      const itemTime = item.time.seconds;
      const itemDate = new Date(itemTime * 1000);
      const isSameDay = itemDate.toDateString() === date.toDateString();
  
      if (isSameDay) {
        totalPrice += item.totalprice;
      }
    });
  
    return totalPrice;
  };

  const calculateTotalPriceForLastWeek = () => {
    // Lấy ngày hiện tại và ngày 7 ngày trước
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
    // Duyệt qua từng đối tượng trong mảng và tính tổng tiền của các đối tượng trong khoảng thời gian của tuần trước
    let totalPrice = 0;
    data.forEach((item) => {
      const itemTime = item.time.seconds;
      const itemDate = new Date(itemTime * 1000);
  
      if (itemDate >= lastWeek && itemDate <= today) {
        totalPrice += item.totalprice;
      }
    });
  
    return totalPrice;
  };

  const calculateTotalPriceForLastMonth = () => {
    // Lấy ngày hiện tại và tháng trước
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    lastMonth.setHours(0, 0, 0, 0);
  
    // Duyệt qua từng đối tượng trong mảng và tính tổng tiền của các đối tượng trong khoảng thời gian của tháng trước
    let totalPrice = 0;
    data.forEach((item) => {
      const itemTime = item.time.seconds;
      const itemDate = new Date(itemTime * 1000);
  
      if (itemDate >= lastMonth && itemDate < today) {
        totalPrice += item.totalprice;
      }
    });
  
    return totalPrice;
  };

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={Revenue()} text={Revenue() + "%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${calculateTotalPriceForDay(today)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$500</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${calculateTotalPriceForLastWeek()}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">${calculateTotalPriceForLastMonth()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
