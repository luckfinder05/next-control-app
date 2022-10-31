import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ControlledTabs from "../../../../components/Prescriptions/ControlledTabs";
import { Table, Container, Spinner } from "react-bootstrap";

function PrescriptionsPage(props) {
  const router = useRouter();
  const [tableData, setTableData] = useState([]);
  const [needToUpdateData, setNeedToUpdateData] = useState(true);
  const [tableStats, setTableStats] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
  });

  useEffect(() => {
    if (needToUpdateData) {
      fetch("/api/gss/getData")
        .then((result) => result.json())
        .then((fetchData) => {
          setTableData(fetchData);
          const total = fetchData.length;
          const resolved = fetchData.filter(el => el['Статус замечания'] === 'Устранено').length;
          const unresolved = total - resolved;
          setTableStats({ total, resolved, unresolved })
        })
        .then(() => setNeedToUpdateData(false))
        .catch((err) => console.error(err));
    }
  }, [needToUpdateData]);

  return (
    <div style={{ width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>Предписания</h1>
      <Container className="mt-2 border rounded">
        <a
          href={`https://docs.google.com/spreadsheets/d/1rYQKe88jLUa-JWCmcvBAEM0oYugXKFrRQZF0OcI9HCY/edit#gid=1122962256`}
          target="_blank"
          rel="noreferrer"
        >
          Таблица замечаний в Google в новой вкладке
        </a>
      </Container>

      <Container className="mt-2 border rounded">
        <h2>Статистика</h2>
        <Table responsive bordered={true} size="sm">
          <tbody>
            <tr>
              <td>Всего замечаний:</td>
              <td>
                {!needToUpdateData && tableStats.total}
                {needToUpdateData && <Spinner size="sm" animation="border" />}
              </td>
            </tr>
            <tr>
              <td>Устранено:</td>
              <td>
                {!needToUpdateData && tableStats.resolved}
                {needToUpdateData && <Spinner size="sm" animation="border" />}
              </td>
            </tr>
            <tr>
              <td>Не устранено:</td>
              <td>
                {!needToUpdateData && tableStats.unresolved}
                {needToUpdateData && <Spinner size="sm" animation="border" />}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <ControlledTabs
        updateData={setNeedToUpdateData}
        tableData={tableData}
      >

      </ControlledTabs>
    </div>
  );
}

export default PrescriptionsPage;
