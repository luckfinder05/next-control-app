import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ControlledTabs from "../../../../components/Prescriptions/ControlledTabs";

function PrescriptionsPage() {
  const router = useRouter();
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

      <ControlledTabs></ControlledTabs>

      <table></table>
    </div>
  );
}

export default PrescriptionsPage;
