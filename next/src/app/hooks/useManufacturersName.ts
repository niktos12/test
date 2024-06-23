import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "../helpers/fetcher";
import { useManufacturesStore } from "../store/store";
export const useManufacturesName = () => {
  const { data, error } = useSWR(
    "http://localhost:3002/manufacturers",
    fetcher
  );
  const setManufacturers = useManufacturesStore(
    (state) => state.setManufacturers
  );
  useEffect(() => {
    if (data) {
      setManufacturers(data.data);
    }
  }, [data, setManufacturers]);
  return { error, manufacturers: data ? data.data : null };
};
