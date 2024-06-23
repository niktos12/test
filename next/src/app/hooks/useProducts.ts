import useSWR, { mutate } from "swr";
import axios from "axios";
import { fetcher } from "../helpers/fetcher";
import { Product } from "../types";

export const useProducts = (
  limit: number,
  page: number,
  searchQuery: string
) => {
  const query = new URLSearchParams({
    _limit: String(limit),
    _page: String(page),
    q: searchQuery,
  }).toString();

  const url = `http://localhost:3002/products?${query}`;

  const { data, error, mutate } = useSWR(url, fetcher);
  const refetch = () => {
    mutate();
  };

  return {
    products: data?.data,
    count: data?.totalCount,
    error: error,
    refetch,
  };
};
export const createProduct = async (data: Product, query: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token available");
  await axios.post("http://localhost:3002/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  mutate(`http://localhost:3002/products?${query}`);
};

export const getProduct = async (id: number) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:3002/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const product = await response.json();
    return product;
  }
};

export const updateProduct = async (
  id: number,
  data: Product,
  query: string
) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token available");

  await axios.patch(`http://localhost:3002/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  mutate(`http://localhost:3002/products?${query}`);
};

export const deleteProduct = async (id: number, query: string) => {
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:3002/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  mutate(`http://localhost:3002/products?${query}`);
};
