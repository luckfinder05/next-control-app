import { useState } from "react";
import { Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import AddForm from "./AddForm";
import DataGrid from "./data-grid";

const ControlledTabs = (props) => {
  const [key, setKey] = useState("add");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="table" title="Таблица">
        <DataGrid tableData={props.tableData} />
      </Tab>
      <Tab eventKey="add" title="Добавить">
        <AddForm tableData={props.tableData} />
      </Tab>
      <Tab eventKey="update" title="Изменить">
        <AddForm />
      </Tab>
      <Tab eventKey="delete" title="Удалить" disabled>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio omnis
        fuga, accusamus aspernatur repellat, ea dolor laboriosam maxime voluptas
        consequatur ex, facilis a et beatae neque vitae ipsa eum asperiores.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio omnis
        fuga, accusamus aspernatur repellat, ea dolor laboriosam maxime voluptas
        consequatur ex, facilis a et beatae neque vitae ipsa eum
        asperiores.Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Optio omnis fuga, accusamus aspernatur repellat, ea dolor laboriosam
        maxime voluptas consequatur ex, facilis a et beatae neque vitae ipsa eum
        asperiores.
      </Tab>
    </Tabs>
  );
};

export default ControlledTabs;
