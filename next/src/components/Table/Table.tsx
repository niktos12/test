import { User, Product } from "@/app/types";
import ProductRow from "../ui/ProductInTable/ProductInTable";

interface TableProps {
  user: User | null;
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const Table = ({
  user,
  products,
  onDelete,
  onEdit
}: TableProps) => {
  return (
    <div className="flex flex-col justify-between w-full bg-white shadow-md rounded-lg">
      <div className="flex w-full justify-between bg-gray-100 text-gray-700 font-medium rounded-t-lg">
        <span className="w-20 p-4">Фото</span>
        <span className="w-32 p-4">Название</span>
        <span className="w-20 p-4">Количество</span>
        <span className="w-44 p-4">Производитель</span>
        <span className="w-24 p-4">Цена</span>
        <span className="w-32 p-4">Действия</span>
      </div>
      {products?.map((product: Product) => (
        <ProductRow
          key={product.id}
          id={product.id}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          photoUrl={product.photoUrl}
          manufacturerId={product.manufacturerId}
          user={user}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default Table;