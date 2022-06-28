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
          Application for successful control of construction site
        </h1>
        <div className="card-body">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab mollitia
            obcaecati tempora molestiae corrupti officia voluptatem pariatur dolor
            enim laudantium. Delectus fugiat voluptates officiis sunt dicta
            ducimus quisquam quidem eius.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab mollitia
            obcaecati tempora molestiae corrupti officia voluptatem pariatur dolor
            enim laudantium. Delectus fugiat voluptates officiis sunt dicta
            ducimus quisquam quidem eius.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab mollitia
            obcaecati tempora molestiae corrupti officia voluptatem pariatur dolor
            enim laudantium. Delectus fugiat voluptates officiis sunt dicta
            ducimus quisquam quidem eius.
          </p>
        </div>
      </div>
    </>
  );
}
