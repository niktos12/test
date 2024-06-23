"use client";
import { useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { useProducts } from "@/app/hooks/useProducts";
import Table from "@/components/Table/Table";
import Pagination from "../Pagination/Pagination";
import Cards from "@/components/ordinary/Cards/Cards";
import OnTableBar from "@/components/ordinary/OnTableBar/OnTableBar";
import { useModalStore } from "@/app/store/store";
import AddProduct from "../AddProductModal/AddProductModal";
import DeleteProduct from "../DeleteProductModal/DeleteProductModal";
import EditProduct from "../EditProductModal/EditProductModal";
import ViewModal from "../CardViewModal/CardViewModal";

const ProductPage = () => {
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [idDeleteProduct, setIdDeleteProduct] = useState<number>(1);
  const [idEditProduct, setIdEditProduct] = useState<number>(1);
  const [idViewProduct, setIdViewProduct] = useState<number>(1);

  const itemsPerPage = 8;

  const { products, count, refetch } = useProducts(
    itemsPerPage,
    page,
    searchQuery
  );
  const { modals, closeModal, openModal } = useModalStore();

  const handleDelete = (id: number) => {
    setIdDeleteProduct(id);
    openModal("deleteProduct");
  };

  const handleDeleteProduct = () => {
    closeModal("deleteProduct");
    refetch();
  };

  const handleEdit = (id: number) => {
    openModal("editProduct");
    setIdEditProduct(id);
  };

  const handleEditProduct = () => {
    closeModal("editProduct");
    refetch();
  };

  const handleView = (id: number) => {
    setIdViewProduct(id);
    openModal("viewProduct");
  };

  const totalCount = Math.ceil(Number(count) / itemsPerPage);

  return (
    <div className="w-full mx-40 mt-10 ">
      <OnTableBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
      />
      <div className="flex flex-col gap-10 justify-between">
        {isActive ? (
          <Table
            user={user}
            products={products}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ) : (
          <Cards user={user} products={products} viewModal={handleView} />
        )}
        <Pagination
          currentPage={page}
          totalPages={totalCount}
          onPageChange={setPage}
        />
      </div>
      {modals.viewProduct && (
        <ViewModal
          onDelete={handleDelete}
          isOpen={modals.viewProduct}
          id={idViewProduct}
          user={user}
          onRequestClose={() => closeModal("viewProduct")}
        />
      )}
      {modals.addProduct && (
        <AddProduct
          isOpen={modals.addProduct}
          page={page}
          searchQuery={searchQuery}
          onRequestClose={() => closeModal("addProduct")}
        />
      )}
      {modals.deleteProduct && (
        <DeleteProduct
          id={idDeleteProduct}
          isOpen={modals.deleteProduct}
          page={page}
          searchQuery={searchQuery}
          onRequestClose={() => handleDeleteProduct()}
        />
      )}
      {modals.editProduct && (
        <EditProduct
          id={idEditProduct}
          isOpen={modals.editProduct}
          page={page}
          searchQuery={searchQuery}
          onRequestClose={() => handleEditProduct()}
        />
      )}
    </div>
  );
};
export default ProductPage;
