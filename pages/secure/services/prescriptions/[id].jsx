import { useRouter } from "next/router";

function PageHandler() {
  const router = useRouter();
  const { id } = router.query;
  // console.log('router.query: ', router.query);

  return <div>id: {id}</div>;
}

export default PageHandler;
