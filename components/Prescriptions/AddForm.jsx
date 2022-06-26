import React, { useEffect, useState } from "react";
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
import { SignIn } from "../../components/UI/icons";
import useInputListGroup from "../../hooks/useInputGroup";
import { InputGroupTextSelect } from "../Helpers";

function AddForm(props) {
  const tableData = props.tableData;
  const [docNumber, setDocNumber] = useState(null);
  const [docDate, setDocDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isDataPosting, setIsDataPosting] = useState(false);
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

  useEffect(() => {
    if (isDataPosting) {
      const pattern = /(\d{4})-(\d{2})-(\d{2})/;
      fetch("/api/gss/postData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _uid: `id${tableData.length + 1}`,
          "№ предписания": docNumber,
          "№ замечания": tableData.length + 1,
          "Вид контроля": workType.value,
          "Дата выдачи замечания": docDate.replace(pattern, "$3.$2.$1"),
          "Содержание предписания": orderText,
          "Статус замечания": order.value || "Не устранено",
          "Дата устранения": "",
          Подрядчик: contractor.value,
          "Представитель ССК": supervisor.value,
          Примечание: "",
        }),
      })
        .then((result) => result.json())
        .then((returnedData) => {
          setIsDataPosting(false);
          console.log(returnedData);
        })
        .catch((err) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataPosting]);

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
    setIsDataPosting(true);
    ev.preventDefault();
    console.log("adding new");
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

        <Form.Group className="mb-3 border rounded p-2">
          <h3>Замечания</h3>
          {/* <Form.Control
              type='number'
            /> */}
          <Stack direction="horizontal" gap={1}>
            <InputGroupTextSelect
              textHeader="Подрядчик"
              textPlaceholder="Введите нового"
              ariaLabel="Подрядчик"
              object={contractor}
            />
            <InputGroupTextSelect
              textHeader="Вид работ"
              textPlaceholder="Введите новый вид"
              ariaLabel="Вид работ"
              object={workType}
            />
          </Stack>

          <InputGroup className="mt-1">
            <InputGroup.Text onClick={setFocusToTextInput}>
              Текст замечания
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={4}
              value={orderText}
              onChange={orderTextHandler}
            />
            <Button
              className="h-10"
              variant="secondary"
              onClick={pasteButtonHandler}
            >
              Вставить текст
            </Button>
          </InputGroup>

          <InputGroup className="mt-1">
            <InputGroup.Text
            //  onClick={setFocusToTextInput}
            >
              Предписано
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              rows={2}
              // value={orderText}
              // onChange={orderTextHandler}
            />
          </InputGroup>

          <InputGroup className="mt-1">
            <InputGroup.Text
            //  onClick={setFocusToTextInput}
            >
              Устранить до
            </InputGroup.Text>
            <Form.Control
              className="flex-shrink-1"
              // value={orderText}
              // onChange={orderTextHandler}
            />
            <Form.Control
              className="ms-auto"
              type="date"
              name="orderDate"
              // onChange={docDateHandler}
              // defaultValue={docDate}
            />
          </InputGroup>

          <Stack className="mt-1" direction="horizontal" gap={1}>
            <InputGroupTextSelect
              textHeader="Статус замечания"
              textPlaceholder="Не устранено"
              ariaLabel="Статус замечания"
              object={order}
              isReadonly={true}
            />
            <InputGroup>
              <InputGroup.Text onClick={setFocusToTextInput}>
                Место обнаружения
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="в осях... отметка... этаж..."
              />
            </InputGroup>
          </Stack>

          <InputGroupTextSelect
            className="mt-1"
            textHeader="Ф.И.О. строительного контроля"
            textPlaceholder="Ф.И.О."
            ariaLabel="Supervisor name"
            object={supervisor}
          />
        </Form.Group>
        <Button
          variant="primary"
          disabled={isDataPosting}
          // as="input"
          type="submit"
          // disabled={formState.isSubmitting}
          onClick={submitHandler}
          value="Записать замечание в таблицу"
        >
          {isDataPosting && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Записать замечание в таблицу
          {/* {formState.isSubmitting && ( */}
          {/* <span className="spinner-border spinner-border-sm mr-1"></span> */}
        </Button>

        {isDataPosting && (
          <Alert key="info" variant="info" className="mt-2">
            Отправка данных на сервер...
          </Alert>
        )}
        {/* {errors.apiError && ( */}
        {/* <div className="alert alert-danger mt-3 mb-0"> */}
        {/* {errors.apiError?.message} */}
        {/* </div> */}
      </Form.Group>
    </Form>
  );
}

export default AddForm;
