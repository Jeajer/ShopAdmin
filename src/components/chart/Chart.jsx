import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Chart = ({ aspect, title }) => {
  const [result, setResult] = useState([]);

  const calculateMonthlyTotal = (data) => {
    const monthlyTotals = {};
  
    data.forEach((item) => {
      const timestamp = item.time.seconds;
      const date = new Date(timestamp * 1000);
      const month = date.toLocaleString("en-US", { month: "long" });
  
      if (!monthlyTotals[month]) {
        monthlyTotals[month] = 0;
      }
  
      monthlyTotals[month] += item.totalprice;
    });
  
    const result = Object.entries(monthlyTotals).map(([name, Total]) => ({
      name,
      Total,
    }));
  
    return result;
  };

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Orders"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setResult(calculateMonthlyTotal(list));
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );    
    return () => {
      unsub();
    };
  }, [db]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={result}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
