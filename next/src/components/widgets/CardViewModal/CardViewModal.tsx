import React, { useEffect, useState } from "react";
import { Manufacturer, Product } from "@/app/types/index";
import { getProduct } from "@/app/hooks/useProducts";
import { User } from "@/app/types";
import { useManufacturesName } from "@/app/hooks/useManufacturersName";
import { useModalStore } from "@/app/store/store";
interface ViewProductProps {
  isOpen: boolean;
  onRequestClose: () => void;
  id: number;
  user: User | null;
  onDelete:(id:number) => void
}

const ViewModal = ({ isOpen, onRequestClose, id, user , onDelete }: ViewProductProps) => {
  const [product, setProduct] = useState<Product>();

  const { manufacturers } = useManufacturesName();
  const { openModal } = useModalStore();

  const manufacturerMap: { [key: number]: string } = {};

  Object.keys(manufacturers).forEach((key) => {
    const manufacturer = manufacturers[key];
    manufacturerMap[manufacturer.id] = manufacturer.name;
  });

  useEffect(() => {
    const handleGetProduct = async (id: number) => {
      try {
        const product = await getProduct(id);
        setProduct(product);
      } catch (error) {
        console.error("Failed to get product:", error);
      }
    };
    handleGetProduct(id);
  }, [id]);

  const handleOpenDeleteModal = () => {
    onRequestClose();
    onDelete(id)
  };

  if (!isOpen || !product) return null;

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } inset-0 flex items-center justify-center bg-black bg-opacity-50 z-60`}
    >
      <div
        className="w-[338px] bg-slate-100 px-5 py-7 flex flex-col gap-5 rounded-lg"
        key={id}
      >
        <img src={product.photoUrl} width={224} height={224}/>
        <span className="text-slate-900 text-2xl font-medium text-center">
          {product.name}
        </span>
        <span className="text-slate-900 text-sm">
          Количество: {product.quantity}
        </span>
        <span className="text-slate-900 text-sm">Цена: {product.price} р</span>
        <span className="text-slate-900 text-sm">{`Производитель: ${manufacturerMap[
          product.manufacturerId
        ]
          ?.toString()
          .substring(0, 15)}${
          manufacturerMap[product.manufacturerId]?.toString().length > 15
            ? "..."
            : ""
        }`}</span>
        <div className="flex gap-3 justify-end">
          {user?.roles.length === 2 && (
            <button onClick={() => handleOpenDeleteModal()}>Удалить</button>
          )}
          <button onClick={() => onRequestClose()}>Назад</button>
        </div>
      </div>
    </div>
  );
};
export default ViewModal;
