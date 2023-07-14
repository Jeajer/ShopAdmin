import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableOrder from "../../components/datatable/DatatableOrder"

const ListProduct = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableOrder/>
      </div>
    </div>
  )
}

export default ListProduct