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

function AddForm(props) {
  const tableData = props.tableData;
  const [contractors, setContractors] = useState([]);
  const [docNumber, setDocNumber] = useState(null);
  const [orderText, setOrderText] = useState("");
  const [selectedContractors, setSelectedContractors] = useState(null);
  const [supervisors, setSupervisors] = useState(null);

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
        setDocNumber(tableData.at(-1)["№ предписания"]);
      }

      function createUniqueOptionsList(dataset, fieldName) {
        return [...new Set(dataset.map((el) => el[fieldName]))].map(
          (el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
            );
          }
        );
      }

      setContractors(createUniqueOptionsList(tableData, "Подрядчик"));
      setSupervisors(createUniqueOptionsList(tableData, "Представитель ССК"));
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

  function contractorSelectHandle(ev) {
    setSelectedContractors(ev.target.value);
  }

  function setFocusToTextInput(ev) {
    return ev.target.nextElementSibling.focus();
  }

  function submitHandler(ev) {
    ev.preventDefault();
    console.log("adding new");
    fetch("/api/gss/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docNumber,
        orderText,
        contractors: selectedContractors,
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
            plaintext
            readOnly
            defaultValue={`№ Предписания: ${docNumber}`}
            type="number"
            placeholder={`№ Предписания: ${docNumber}`}
          />
        </Stack>
        <Form.Text id="docNumberHelpBlock" muted>
          Переключи, если это первый пункт нового предписания.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="addForm.ControlInput2">
        <InputGroup className="mb-3">
          <InputGroup.Text onClick={setFocusToTextInput}>Подрядчик:</InputGroup.Text>
          <Form.Control aria-label="Supervisor name" />
          <Form.Select
            aria-label="Выбор подрядчика"
            onChange={contractorSelectHandle}
          >
            <option key="default-key" value={null}>
              Выберите подрядчика из списка ...
            </option>
            {contractors}
          </Form.Select>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="addForm.ControlInput3">
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
        </InputGroup>
        <Button onClick={pasteButtonHandler}>Вставить текст</Button>
      </Form.Group>

      <InputGroup className="mb-3">
        <InputGroup.Text>Статус замечания:</InputGroup.Text>
        <Form.Control
          // plaintext
          readOnly
          defaultValue={`Не устранено`}
          placeholder={`Не устранено`}
          aria-label="Order status"
        />
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text onClick={setFocusToTextInput}>
          Фамилия сотрудника строительного контроля:
        </InputGroup.Text>
        <Form.Control aria-label="Supervisor name" />
        <Form.Select aria-label="Default select example">
          <option key="default-key" value={null}>
            Выберите из списка ...
          </option>
          {supervisors}
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
