import { memo } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Input from "@/components/ui/Input/Input";
import CardsButton from "@/components/ui/CardsButton/CardsButton";
import TableButton from "@/components/ui/TableButton/TebleButton";
import { useModalStore } from "@/app/store/store";

interface OnTableBarProps {
  searchQuery: string;
  setSearchQuery: (e: string) => void;
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const OnTableBar = ({
  searchQuery,
  setSearchQuery,
  isActive,
  onClick,
}: OnTableBarProps) => {
  const { user } = useAuth();
  const { modals, openModal, closeModal } = useModalStore();

  const handleOpenModal = () => {
    openModal("addProduct");
  };
  return (
    <div className="flex py-3 justify-between items-center bg-gray-100 rounded-md shadow-sm">
      <div className="w-64">
        <Input
          type="text"
          value={searchQuery}
          id="searchQuery"
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск"
          label=""
        />
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-[120px] flex">
          <TableButton isActive={isActive} onClick={onClick} />
          <CardsButton isActive={!isActive} onClick={onClick} />
        </div>
        {user?.roles.length === 2 && (
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 rounded-md font-medium text-base transition duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Добавить
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(OnTableBar);
