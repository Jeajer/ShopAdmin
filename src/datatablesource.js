export const userColumns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.displayName}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
  {
    field: "country",
    headerName: "Country",
    width: 160,
  },
  // {
  //   field: "country",
  //   headerName: "Country",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 400,
  },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  {
    field: "color",
    headerName: "Color",
    width: 100,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  
  // {
  //   field: "country",
  //   headerName: "Country",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Customer",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "totalprice",
    headerName: "Total price",
    width: 100,
  },
  {
    field: "totalquantity",
    headerName: "Total quantity",
    width: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];
