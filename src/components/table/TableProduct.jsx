import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const List = ({items}) => {
const [data, setData] = useState([]);

//   const [product, setProduct] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(
//       collection(db, "Orders"),
//       (snapShot) => {
//         let list = [];
//         snapShot.docs.forEach((doc) => {
//           list.push({ id: doc.id, ...doc.data() });
//         });
//         setData(list);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );

//     return () => {
//       unsub();
//     };

//     setData(data.filter((item) => item.idacc === idacc)); 
//   }, []);

  useEffect(() => {
    const dt = Object.values(items);
    const dataArray = Array.isArray(dt) ? dt : [];
    setData(dataArray);
  },[items])
  

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Product ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Color</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.imageUrl} alt="" className="image" />
                  {row.title}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.color}</TableCell>
              <TableCell className="tableCell">$ {row.price}</TableCell>
              <TableCell className="tableCell">{row.quantity}</TableCell>
              <TableCell className="tableCell">$ {row.price * row.quantity}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
