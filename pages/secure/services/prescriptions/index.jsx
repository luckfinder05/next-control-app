import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ControlledTabs from "../../../../components/Prescriptions/ControlledTabs";

function PrescriptionsPage(props) {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("/api/gss/getData")
      .then((result) => result.json())
      .then((fetchData) => setTableData(fetchData))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Предписания</h1>
      <a
        href={`https://docs.google.com/spreadsheets/d/15qJi39meo8qPe_7dXblg-CMiET_rVCuBguwXhxrcQm0/edit#gid=1122962256`}
        target="_blank"
        rel="noreferrer"
      >
        Таблица замечаний в Google в новой вкладке
      </a>

      <ControlledTabs tableData={tableData}></ControlledTabs>

      {/* <table></table> */}
    </div>
  );
}

export default PrescriptionsPage;
