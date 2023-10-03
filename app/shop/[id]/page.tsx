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

export default function Page({ params }: any) {
  const { id } = params;
  const { isOpen, toggle } = useModal();

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

  return (
    <>
      {userRole === "ADMIN" ? (
        <>
          <Modal isOpen={isOpen} toggle={toggle}>
            <CreateProduct toggle={toggle} shopId={id} refetch={refetch} />
          </Modal>
          <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
            <Link href={`/shop/${id}/team`}>
              <Button className="bg-slate-200 text-black hover:bg-slate-300">
                Manage users
              </Button>
            </Link>
            <Button onClick={toggle}>Add New Product</Button>
          </div>
        </>
      ) : null}

      {isLoading ? (
        <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
          loading Products...
        </div>
      ) : products ? (
        <ProductsTable products={products} />
      ) : null}
    </>
  );
}
