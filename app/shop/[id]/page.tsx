"use client";

import { Button } from "@/components";
import "./shop.css";
import ProductsTable from "@/components/products/ProductsTable";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import { CreateProduct } from "@/components/products/CreateProduct";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getUserRole } from "@/services";
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function Page({ params }: any) {
  const { id } = params;
  const { isOpen, toggle, openModal, closeModal } = useModal();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(id),
  });

  const { data: userRole } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => getUserRole(id),
  });

  useEffect(() => {
    if (editingProduct) {
      openModal();
    } else {
      closeModal();
    }
  }, [editingProduct]);

  useEffect(() => {}, []);

  if (error) {
    return <div>could not fetch products</div>;
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateProduct
          userRole={userRole || "MANAGER"}
          toggle={toggle}
          shopId={id}
          refetch={refetch}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      </Modal>
      {userRole === "ADMIN" ? (
        <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
          <Link href={`/shop/${id}/team`}>
            <Button className="bg-slate-200 text-black hover:bg-slate-300">
              Manage users
            </Button>
          </Link>
          <Button onClick={toggle}>Add New Product</Button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
          loading Products...
        </div>
      ) : products?.length ? (
        <ProductsTable
          shopId={id}
          products={products}
          userRole={userRole || "MANAGER"}
          refetch={refetch}
          setEditingProduct={setEditingProduct}
        />
      ) : (
        <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
          Products not found add new
        </div>
      )}
    </>
  );
}
