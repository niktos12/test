import { Product, User } from "@/app/types";
import ProductCard from "../../ui/ProductCard/ProductCard";
interface CardsProps {
  user: User | null;
  products: Product[];
  viewModal: (id: number) => void;
}

const Cards = ({ user, products, viewModal }: CardsProps) => {
  return (
    <div className="grid grid-cols-[repeat(4,244px)] w-full justify-center items-center gap-x-[10px] gap-y-5">
      {products?.map((product: Product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          quantity={product.quantity}
          price={product.price}
          photoUrl={product.photoUrl}
          manufacturerId={product.manufacturerId}
          user={user}
          viewModal={viewModal}
        />
      ))}
    </div>
  );
};

export default Cards;
