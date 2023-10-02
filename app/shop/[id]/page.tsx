"use client";
import { Button } from "@/components";
import "./shop.css";
import ProductsTable from "@/components/products/ProductsTable";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import { CreateProduct } from "@/components/products/CreateProduct";
import Link from "next/link";

export default function Page({ params }: any) {
  const { id } = params;
  const { isOpen, toggle } = useModal();
  console.log(id);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateProduct toggle={toggle} />
      </Modal>
      <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
        <Link href={`/shop/${id}/users`}>
          <Button className="bg-slate-200 text-black hover:bg-slate-300">
            Manage users
          </Button>
        </Link>
        <Button onClick={toggle}>Add New Product</Button>
      </div>

      <ProductsTable />
    </>
  );
}
