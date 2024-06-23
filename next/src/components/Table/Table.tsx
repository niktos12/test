import { User , Product } from "@/app/types";
import ProductRow from "../ui/ProductInTable/ProductInTable";
interface TableProps {
  user: User | null;
  products: Product[];
  onDelete: (id:number) => void
  onEdit:(id:number) => void
}

const Table = ({
  user,
  products,
  onDelete,
  onEdit
}: TableProps) => {
  return (
    <div className="flex flex-col justify-between w-full">
      <div className="flex w-full justify-between">
        <span className="w-20 p-2">Фото</span>
        <span className="w-32 p-2">Название</span>
        <span className="w-20 p-2">Количество</span>
        <span className="w-44 p-2">Производитель</span>
        <span className="w-24 p-2">Цена</span>
        <span className="w-32 p-2"> </span>
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