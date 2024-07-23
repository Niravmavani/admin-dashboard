import React from "react";
import { useRouter } from "next/router";
function dynamic() {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <h3>{router.query.id}</h3>
    </>
  );
}

export default dynamic;
