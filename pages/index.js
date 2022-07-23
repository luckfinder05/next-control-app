import Head from "next/head";
import { useEffect, useState } from "react";

export default Home;

function Home() {
  return (
    <>
      <Head>
        <title>Главная страница</title>
      </Head>
      <div className="card mt-4">
        <h1 className="card-header">
          Updates
        </h1>
        <div className="card-body">
          <p>
            23/07/2022 Добавлен список пользователей в настройках
            
          </p>
        </div>
      </div>
    </>
  );
}
