import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function PrescriptionsPage() {
  const router = useRouter();
  return (
    <div style={{ width: "500px" }}>
      <h1 style={{ textAlign: "center" }}>Prescriptions</h1>
      <h2 style={{ textAlign: "left" }}>CRUD</h2>
      <ul>
        <li>Create</li>
        <li>Read</li>
        <li>Update</li>
        <li>Delete</li>
      </ul>
      <Link href={`${router.route}/data-grid`}>Таблица замечаний</Link>

      <table></table>
    </div>
  );
}

export default PrescriptionsPage;
