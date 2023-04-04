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
        <h2 className="card-header">
          Updates
        </h2>
        <div className="card-body">
          <p>
            12/03/2023 Создан новый домен https://lsr-wave.vercel.app
          </p>
        </div>

      </div>

      

      <div className="card mt-4">
      
        <h2>
          TO-DO
        </h2>
        <ul>
          <li>Создать новую таблицу для реестра предписаний</li>
          <li>Записать id новой таблицы предписаний в dot.env</li>
          <li>Проверить и скорректировать заголовки таблицы</li>
          
        </ul>
      </div>

    </>
  )
}
