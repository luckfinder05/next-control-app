import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { SignIn } from "../../components/UI/icons";

function AddForm(props) {
  const tableData = props.tableData;
  const [contractors, setContractors] = useState([]);
  const [docNumber, setDocNumber] = useState(null);
  const [orderText, setOrderText] = useState("");
  const [selectedContractors, setSelectedContractors] = useState(null);

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

      setContractors(
        [...new Set(tableData.map((el) => el["Подрядчик"]))].map(
          (el, index) => {
            return (
              <option key={index} value={el}>
                {el}
              </option>
              // <Form.Check
              //   key={el}
              //   label={el}
              //   onClick={contractorSelectHandle}
              //   name="contractors"
              //   type="radio"
              //   id={`inline-checkbox-${index}`}
              // />
            );
          }
        )
      );
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
  
  function onSubmit(ev) {
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
    <Form onSubmit={onSubmit}>
      <h2>Добавить новое замечание в реестр</h2>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>№ предписания:</Form.Label>
        <Form.Control
          plaintext
          readOnly
          defaultValue={docNumber}
          type="number"
          placeholder={docNumber}
        />
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Это новое предписание"
          onChange={docNumberHandler}
        />
        <Form.Text id="docNumberHelpBlock" muted>
          Переключить, если это пункт нового предписания.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Подрядчик:</Form.Label>

        <Form.Select
          aria-label="Выбор подрядчика"
          onChange={contractorSelectHandle}
        >
          <option key="default-key" value={null}>
            Выберите подрядчика из списка ...
          </option>
          {contractors}
        </Form.Select>
        {/* {contractors} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label>Текст замечания:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={orderText}
          onChange={orderTextHandler}
        />
        <Button onClick={pasteButtonHandler}>Вставить текст</Button>
      </Form.Group>

      <Button
        variant="primary"
        // disabled={formState.isSubmitting}
        onClick={onSubmit}
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
