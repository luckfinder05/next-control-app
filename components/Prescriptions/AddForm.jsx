import React from "react";
import {
  Button,
  Card,
  Form,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { SignIn } from "../../components/UI/icons";

function AddForm() {
  function onSubmit(ev) {
    ev.preventDefault();
    console.log('adding new')
  }

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

  return (
    <Form onSubmit={onSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <FormControl
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup>
      <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon3">
          https://example.com/users/
        </InputGroup.Text>
        <FormControl id="basic-url" aria-describedby="basic-addon3" />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <FormControl aria-label="Amount (to the nearest dollar)" />
        <InputGroup.Text>.00</InputGroup.Text>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>With textarea</InputGroup.Text>
        <FormControl as="textarea" aria-label="With textarea" />
      </InputGroup>
      <Button
        variant="primary"
        // disabled={formState.isSubmitting}
        onClick={onSubmit}
      >
        <SignIn /> Изменить
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
