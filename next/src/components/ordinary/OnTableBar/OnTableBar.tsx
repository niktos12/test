import { memo } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import Input from "@/components/ui/Input/Input";
import CardsButton from "@/components/ui/CardsButton/CardsButton";
import TableButton from "@/components/ui/TableButton/TebleButton";
import { useModalStore } from "@/app/store/store";
interface OnTableBarProps {
  searchQuery: string;
  setSearchQuery: (e: string) => void;
  //   openModal: () => void;
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
    <div className="flex px-2 py-4 justify-between items-center">
      <div className="w-60">
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
        <div className="w-[100px] flex justify-between">
          <TableButton isActive={isActive} onClick={onClick} />
          <CardsButton isActive={!isActive} onClick={onClick} />
        </div>
        {user?.roles.length === 2 && <button onClick={handleOpenModal}>Добавить</button>}
      </div>
    </div>
  );
};

export default memo(OnTableBar);
