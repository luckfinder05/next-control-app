import Head from "next/head";
import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

function Page(props) {
  
  const originalLinkRef = useRef();
  const [newLink, setNewLink] = useState({ isLoaded: false });

  const submitHandler = (ev) => {
    ev.preventDefault();

    const submit = async () => {
      try {
        const response = await fetch("/api/s/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            originalLink: originalLinkRef.current.value,
          }),
        });
        const result = await response.json();
        setNewLink(result);
        return result;
      } catch (err) {
        console.error(err);
      }
    };
    submit();
  };

  return (
    <>
    <Head>
      <title>Create Short Link</title>
    </Head>
      <h1>Link shortener</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formLinkOriginal">
          <Form.Label>Оригинальная ссылка:</Form.Label>
          <Form.Control
            type="text"
            placeholder="http://..."
            ref={originalLinkRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitHandler}>
          Отправить
        </Button>
      </Form>
      {newLink.link && (
        <a href={newLink.link} rel="noopener noreferrer" target="_blank">
          {newLink.link}
        </a>
      )}
    </>
  );
}

export default Page;
