import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Product_page from "../Product_page/Product_page";
import Side_nav from "../Side_nav/Side_nav";


const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div>
      <Side_nav />
      <Product_page  />
    </div>
  );
};

export default Dashboard;
