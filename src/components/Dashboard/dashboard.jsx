import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Product_page from "../product/ProductPage";
import Side_nav from "../SideNav/Side_nav";

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
      <Product_page />
    </div>
  );
};

export default Dashboard;
