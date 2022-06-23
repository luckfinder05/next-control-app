import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  InputGroup,
  FormControl,
  Stack,
} from "react-bootstrap";
import { SignIn } from "../../components/UI/icons";
import useInputListGroup from "../../hooks/useInputGroup";

function AddForm(props) {
  const tableData = props.tableData;
  const [docNumber, setDocNumber] = useState(null);
  const [docDate, setDocDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [orderText, setOrderText] = useState("");
  const contractor = useInputListGroup(tableData, "Подрядчик");
  const workType = useInputListGroup(tableData, "Вид контроля");
  const supervisor = useInputListGroup(tableData, "Представитель ССК");
  const order = useInputListGroup(tableData, "Статус замечания");

  /* 
    '_uid': row[0],
    '№ предписания': row[1],
    '№ замечания': row[2],
    'Вид контроля': row[3],
    'Дата выдачи замечания': row[4],
    'Содержание предписания': row[5],
    'Статус замечания': row[6],
    'Дата устранения': row[7],
    'Подрядчик': row[8],
    'Представитель ССК': row[9],
    'Примечание': row[10]
  */

  useEffect(() => {
    if (Array.isArray(tableData)) {
      if (tableData.length !== 0) {
        setDocNumber(Number(tableData.at(-1)["№ предписания"]));
      }
    }
  }, [tableData]);

  function docNumberHandler(value) {
    setDocNumber(
      Number(tableData.at(-1)["№ предписания"]) + value.target.checked
    );
  }

  function pasteButtonHandler(ev) {
    navigator.clipboard.readText().then((res) => {
      setOrderText((orderText += res));
    });
  }

  function orderTextHandler(ev) {
    setOrderText(ev.target.value);
  }

  function setFocusToTextInput(ev) {
    return ev.target.nextElementSibling.focus();
  }

  function docDateHandler(ev) {
    setDocDate(ev.target.value);
  }

  function submitHandler(ev) {
    ev.preventDefault();
    console.log("adding new");
    fetch("/api/gss/postData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _uid: `_uid${tableData.length + 1}`,
        "№ предписания": docNumber,
        "Вид контроля": workType.value,
        "Дата выдачи замечания": docDate,
        "Содержание предписания": orderText,
        "Статус замечания": order.value || "Не устранено",
        "Дата устранения": "",
        Подрядчик: contractor.value,
        "Представитель ССК": supervisor.value,
        Примечание: "",
      }),
    })
      .then((result) => result.json())
      .then((returnedData) => console.log(returnedData))
      .catch((err) => console.error(err));
  }
  return (
    <Form className="border border-light rounded p-2" onSubmit={submitHandler}>
      <h2>Добавить замечание в реестр</h2>

      <Form.Group
        className="mb-3 border rounded p-2"
        controlId="addForm.ControlInput1"
      >
        <Stack direction="horizontal" gap={1}>
          <Form.Check
            className="col-3"
            type="switch"
            id="custom-switch"
            label="Новое предписание"
            onChange={docNumberHandler}
          />
          <Form.Control
            type="text"
            plaintext
            readOnly
            value={`№ Предписания: ${docNumber}`}
            placeholder={`№ Предписания: ${docNumber}`}
          />
          <Form.Control
            type="date"
            name="orderDate"
            onChange={docDateHandler}
            defaultValue={docDate}
          />
        </Stack>
        <Form.Text id="docNumberHelpBlock" muted>
          Переключи, если это первый пункт нового предписания.
        </Form.Text>

        <InputGroup className="mt-3">
          <InputGroup.Text onClick={setFocusToTextInput}>
            Статус замечания:
          </InputGroup.Text>
          <Form.Control
            readOnly
            aria-label="Order status"
            value={order.value}
            onChange={order.onChange}
            placeholder="Не устранено"
          />
          <Form.Select
            aria-label="Выбор подрядчика"
            value={order.value}
            onChange={order.onChange}
          >
            <option key="default-key" value="">
              Статус замечания
            </option>
            {order.list}
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <InputGroup className="mb-3">
        <InputGroup.Text onClick={setFocusToTextInput}>
          Подрядчик:
        </InputGroup.Text>
        <Form.Control
          aria-label="Подрядчик"
          value={contractor.value}
          onChange={contractor.onChange}
          placeholder="Выберите подрядчика из списка или введите нового"
        />
        <Form.Select
          aria-label="Выбор подрядчика"
          value={contractor.value}
          onChange={contractor.onChange}
        >
          <option key="default-key" value="">
            Список подрядчиков ...
          </option>
          {contractor.list}
        </Form.Select>
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text onClick={setFocusToTextInput}>
          Вид работ:
        </InputGroup.Text>
        <Form.Control
          aria-label="Вид работ"
          value={workType.value}
          onChange={workType.onChange}
          placeholder="Выберите вид работ из списка или введите новый"
        />
        <Form.Select
          aria-label="Выбор вида работ"
          value={workType.value}
          onChange={workType.onChange}
        >
          <option key="default-key" value="">
            Виды работ...
          </option>
          {workType.list}
        </Form.Select>
      </InputGroup>

      <InputGroup className="mb-1">
        <InputGroup.Text onClick={setFocusToTextInput}>
          Текст замечания:
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          rows={4}
          value={orderText}
          onChange={orderTextHandler}
        />
        <Button className="h-10" onClick={pasteButtonHandler}>
          Вставить текст
        </Button>
      </InputGroup>

      {/* <InputGroup className="mb-1">
        <InputGroup.Text onClick={setFocusToTextInput}>
          Текст замечания:
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          rows={4}
          value={orderText}
          onChange={orderTextHandler}
        />
      </InputGroup> */}

      <InputGroup className="mb-3">
        <InputGroup.Text onClick={setFocusToTextInput}>
          Фамилия сотрудника строительного контроля:
        </InputGroup.Text>
        <Form.Control
          aria-label="Supervisor name"
          value={supervisor.value}
          onChange={supervisor.onChange}
        />
        <Form.Select
          aria-label="Default select example"
          value={supervisor.value}
          onChange={supervisor.onChange}
        >
          <option key="default-key" value="">
            Выберите из списка ...
          </option>
          {supervisor.list}
        </Form.Select>
      </InputGroup>

      <Button
        variant="primary"
        // disabled={formState.isSubmitting}
        onClick={submitHandler}
      >
        Добавить
        {/* {formState.isSubmitting && ( */}
        {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
      </Button>
      {/* {errors.apiError && ( */}
      <div className="alert alert-danger mt-3 mb-0">
        {/* {errors.apiError?.message} */}
      </div>
    </Form>
  );
}

export default AddForm;
