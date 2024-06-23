"use client";
import Sidebar from "@/components/SideBar.tsx/SideBar";
import Pagination from "@/components/widgets/Pagination/Pagination";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductPage from "@/components/widgets/ProductPage/ProductPage";

export default function Product() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <ProductPage />
    </div>
  );
}
