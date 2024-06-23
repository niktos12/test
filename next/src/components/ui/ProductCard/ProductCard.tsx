import { User } from "@/app/types";
import { useModalStore } from "@/app/store/store";
import { useManufacturesName } from "@/app/hooks/useManufacturersName";
interface ProductRowProps {
  id: number;
  name: string;
  quantity: number;
  price: string;
  photoUrl: string;
  manufacturerId: number;
  user: User | null;
  viewModal: (id:number) => void
}
const ProductCard = ({
  id,
  name,
  quantity,
  price,
  photoUrl,
  manufacturerId,
  viewModal,
}: ProductRowProps) => {
  const { manufacturers } = useManufacturesName();
  const { openModal } = useModalStore();
  const manufacturerMap: { [key: number]: string } = {};

  const handleViewProduct = (id: number) => {
    openModal("viewProduct");
    viewModal(id);
  }


  if (manufacturers) {
    Object.keys(manufacturers).forEach((key) => {
      const manufacturer = manufacturers[key];
      manufacturerMap[manufacturer.id] = manufacturer.name;
    });
  }
  return (
    <div
      className="w-[244px] h-[334px] p-2 flex flex-col rounded-lg gap-1.5 cursor-pointer hover:bg-slate-300 duration-300 justify-between items-center"
      key={id}
      onClick={() => handleViewProduct(id)}
    >
      <div className="p-2">
        <img src={photoUrl} width={224} height={224} className="rounded-lg" />
      </div>
      <span className="text-slate-900 text-center">{name}</span>
      <span className="text-slate-900 text-sm text-center">
        {manufacturerMap[manufacturerId] || "пусто"}
      </span>
      <div className="px-2 w-full flex justify-between">
        <span className="text-slate-900 text-sm">{quantity} шт</span>
        <span className="text-slate-900 text-sm">{price} р</span>
      </div>
    </div>
  );
};

export default ProductCard;
