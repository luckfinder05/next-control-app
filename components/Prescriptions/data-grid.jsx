import React, { useEffect, useRef, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Head from "next/head";

export default function DataGrid() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const filterParams = {
    buttons: ["reset", "apply"],
    debounceMs: 200,
  };

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    filterParams,
    enableRowGroup: true,
    autoHeight: true,
  };

  const [colDefs, setColDefs] = useState([
    { field: "_uid", hide: true },
    { field: "№ предписания", width: 100 },
    { field: "№ замечания", width: 100 },
    { field: "Вид контроля", headerName: "Тип", wrapText: true, flex: true },
    { field: "Дата выдачи замечания", headerName: "Дата выдачи", width: 150 },
    {
      field: "Содержание предписания",
      wrapText: true,
      width: 400,
      flex: true,
      autoHeight: true,
    },
    { field: "Статус замечания", headerName: "Статус", width: 150 },
    { field: "Дата устранения" },
    { field: "Подрядчик" },
    { field: "Представитель ССК" },
    { field: "Примечание", wrapText: true, flex: true },
  ]);

  useEffect(() => {
    fetch("/api/gss")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  const rowStyle = { background: "transparent" };
  // set background colour on even rows again, this looks bad, should be using CSS classes
  const getRowStyle = (params) => {
    if (params.node.data["Статус замечания"].toLowerCase() === "устранено") {
      console.log(params.node.data["Статус замечания"].toLowerCase());
      return { background: "rgba(0,255,0,0.1)" };
    }
    if (params.node.rowIndex % 2 === 0) {
      // console.log("params.node: ", params.node);

      return { background: "lightgrey" };
    }
  };

  return (
    <>
      <Head>
        <title>Таблица предписаний</title>
      </Head>
      <h1>Таблица предписаний</h1>
      <div
        className="ag-theme-alpine"
        style={{ height: "70vh", width: "100%" }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          columnDefs={colDefs}
          pagination={true}
          rowData={rowData}
          rowStyle={rowStyle}
          getRowStyle={getRowStyle}
          ref={gridRef}
        />
      </div>
    </>
  );
}
