import DataTable from "react-data-table-component";
import styled from "styled-components";
import {
  Alert,
  Button,
  Card,
  Form,
  Container,
  InputGroup,
  FormControl,
  Stack,
} from "react-bootstrap";

import React, { useEffect, useRef, useState } from "react";

// data provides access to your row data
const ExpandedComponent = ({ data }) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

function numericSort(rowA, rowB) {
  const a = Number(rowA["№ замечания"]);
  const b = Number(rowB["№ замечания"]);
  return a > b;
  return 0;
}

const customSort = (rows, selector, direction) => {
  // console.log("rows: ", rows);
  // console.log('rows, selector, direction: ', rows, selector, direction);
  return rows.sort((rowA, rowB) => {
    // use the selector function to resolve your field names by passing the sort comparitors
    const aField = selector(rowA);
    const bField = selector(rowB);

    let comparison = 0;

    if (aField > bField) {
      comparison = 1;
    } else if (aField < bField) {
      comparison = -1;
    }

    return direction === "desc" ? comparison * -1 : comparison;
  });
};

function dateSort(rowA, rowB) {
  const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  const a = new Date(
    rowA["Дата выдачи замечания"].replace(pattern, "$3-$2-$1")
  ).getTime();
  const b = new Date(
    rowB["Дата выдачи замечания"].replace(pattern, "$3-$2-$1")
  ).getTime();
  // console.log("a > b: ", a, b);
  return a > b;
  return 0;
}

const customStyles = {
  table: {
    style: { "border-collapse": "collapse", border: "1px solid black" },
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
      // border: "1px solid black",
      "&:hover": {
        boxShadow: `-10px 0px 13px -7px #000000,
          10px 0px 13px -7px #000000,
          5px 5px 15px 5px rgba(0,0,0,0.1);`,
      },
    },
  },
  // columns: {
  //   style: {
  //     border: "1px solid black",
  //   },
  // },
  headCells: {
    style: {
      paddingLeft: "5px", // override the cell padding for head cells
      paddingRight: "1px",
      fontSize: 15,
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
      },
      // border: "1px solid black",
    },
  },
  cells: {
    style: {
      "&:not(:last-of-type)": {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
      },
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
      // border: "1px solid black",
    },
  },
};

const conditionalRowStyles = [
  {
    when: (row) => row["Статус замечания"] === "Устранено",
    style: {
      backgroundColor: "rgba(0, 255, 0, 0.2)",
      // color: "white",
      "&:hover": {
        cursor: "pointer",
        backgroundColor: "red",
      },
    },
  },
  // You can also pass a callback to style for additional customization
  {
    when: (row) => row["Статус замечания"] !== "Устранено",
    style: {
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      // color: "white",
      // "&:hover": {
      //   cursor: "pointer",
      //   backgroundColor: "red",
      // },
    },
  },
];

export default function TableGrid(props) {
  const tableData = props.tableData;
  const data = [...tableData];

  const columns = [
    {
      name: "№ предписания",
      selector: (row) => row["№ предписания"],
      omit: true,
    },
    {
      name: "№",
      selector: (row) => row["№ замечания"],
      sortable: true,
      width: "50px",
      sortFunction: numericSort,
      style: { backgroundColor: "rgba(182, 182, 182, 0.107)" },
    },
    {
      name: "Вид работ",
      selector: (row) => row["Вид контроля"],
      wrap: true,
      sortable: true,
      width: "100px",
    },
    {
      name: "Выдано:",
      selector: (row) => row["Дата выдачи замечания"],
      sortable: true,
      width: "100px",
      sortFunction: dateSort,
      // format: (row, index) => {
      //   const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      //   return new Date(
      //     row["Дата выдачи замечания"].replace(pattern, "$3-$2-$1")
      //   ).getTime();
      // },
    },
    {
      name: "Содержание предписания",
      selector: (row) => row["Содержание предписания"],
      wrap: true,
      // width: "480px",
      grow: 2,
    },
    {
      name: "Статус",
      selector: (row) => row["Статус замечания"],
      sortable: true,
      width: "100px",
      // omit: true,
    },
    {
      name: "Устранено:",
      selector: (row) => row["Дата устранения"],
      sortable: true,
      width: "100px",
      sortFunction: dateSort,
    },
    {
      name: "Подрядчик",
      selector: (row) => row["Подрядчик"],
      wrap: true,
      sortable: true,
      width: "150px",
    },
    {
      name: "Представитель ССК",
      selector: (row) => row["Представитель ССК"],
      sortable: true,
      width: "100px",
      omit: true,
    },
    {
      name: "Примечание",
      selector: (row) => row["Примечание"],
      width: "100px",
      omit: true,
    },
  ];

  // const [filterText, setFilterText] = useState("");
  // const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // const filteredItems = () => {
  //   console.log('data.length: ', data.length);
  //   if (data.length !== 0) {
  //     return data.filter(
  //       (item) =>
  //         item["Содержание предписания"] &&
  //         item["Содержание предписания"]
  //           .toLowerCase()
  //           .includes(filterText.toLowerCase())
  //     );
  //   }
  // };

  // const subHeaderComponentMemo = React.useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };

  //   return (
  //     <FilterComponent
  //       onFilter={(e) => setFilterText(e.target.value)}
  //       onClear={handleClear}
  //       filterText={filterText}
  //     />
  //   );
  // }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title="Реестр предписаний"
      columns={columns}
      data={tableData}
      // data={filteredItems}
      // pagination
      sortable
      sortFunction={customSort}
      customStyles={customStyles}
      // paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      // subHeader
      // subHeaderComponent={subHeaderComponentMemo}
      // selectableRows
      dense
      // persistTableHead
      expandableRows
      expandOnRowClicked
      expandableRowsComponent={ExpandedComponent}
      // highlightOnHover
      pointerOnHover
      conditionalRowStyles={conditionalRowStyles}
    />
  );
}

// const TextField = styled.input`
// height: 32px;
// width: 200px;
// border-radius: 3px;
// border-top-left-radius: 5px;
// border-bottom-left-radius: 5px;
// border-top-right-radius: 0;
// border-bottom-right-radius: 0;
// border: 1px solid #e5e5e5;
// padding: 0 32px 0 16px;
// &:hover {
//   cursor: pointer;
// }
// `;

// const ButtonStyle = styled.button`
// 	background-color: #2979ff;
// 	border: none;
// 	color: white;
// 	padding: 8px 32px 8px 32px;
// 	text-align: center;
// 	text-decoration: none;
// 	display: inline-block;
// 	font-size: 16px;
// 	border-radius: 3px;
// 	&:hover {
// 		cursor: pointer;
// 	}
// `;

// const ClearButton = styled(ButtonStyle)`
// border-top-left-radius: 0;
// border-bottom-left-radius: 0;
// border-top-right-radius: 5px;
// border-bottom-right-radius: 5px;
// height: 34px;
// width: 32px;
// text-align: center;
// display: flex;
// align-items: center;
// justify-content: center;
// `;

// // eslint-disable-next-line react/prop-types
// const FilterComponent = ({ filterText, onFilter, onClear }) => (
// <>
//   <TextField
//     id="search"
//     type="text"
//     placeholder="Filter By Name"
//     aria-label="Search Input"
//     value={filterText}
//     onChange={onFilter}
//   />
//   <ClearButton type="button" onClick={onClear}>
//     X
//   </ClearButton>
// </>
// );
