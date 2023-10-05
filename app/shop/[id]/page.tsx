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

import {
  next,
  previous,
  updateTotalProducts,
} from "@/redux/features/paginationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Page({ params }: any) {
  const { id } = params;
  const { isOpen, toggle, openModal, closeModal } = useModal();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const currentPage = useAppSelector((state) => state.paginationReducer);
  const dispatch = useAppDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", currentPage.page],
    queryFn: () => getProducts(id, currentPage.page),
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
  }, [closeModal, editingProduct, openModal]);

  if (error) {
    return <div>could not fetch products</div>;
  }

  if (data?.totalProductsCount) {
    dispatch(updateTotalProducts(data?.totalProductsCount));
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateProduct
          userRole={userRole || "MANAGER"}
          toggle={toggle}
          shopId={id}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          refetch={refetch}
        />
      </Modal>
      {userRole === "ADMIN" ? (
        <div className="flex md:flex-row flex-col md:justify-between md:items-center px-4 md:px-12 lg:px-28 mt-6 mb-2">
          <div className="text-2xl font-semibold text-center md:text-left md:mb-0 mb-6">
            Products
          </div>
          <div className="flex gap-3 justify-end">
            <Link href={`/shop/${id}/team`}>
              <Button className="bg-slate-200 text-black hover:bg-slate-300">
                Manage users
              </Button>
            </Link>
            <Button onClick={toggle}>Add New Product</Button>
          </div>
        </div>
      ) : null}

      {isLoading ? (
        <div className="text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
          Loading Products...
        </div>
      ) : data?.products?.length ? (
        <>
          <ProductsTable
            shopId={id}
            products={data.products}
            userRole={userRole || "MANAGER"}
            setEditingProduct={setEditingProduct}
            refetch={refetch}
          />

          <div className="flex flex-col items-center mb-4">
            <span className="text-sm text-gray-700 flex gap-1">
              Showing
              <span className="font-semibold text-gray-900 ">
                {currentPage.start}{" "}
              </span>
              to
              <span className="font-semibold text-gray-900 ">
                {currentPage.end}
              </span>
              of
              <span className="font-semibold text-gray-900 ">
                {data.totalProductsCount}
              </span>
              Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0 gap-1">
              <button
                onClick={() => dispatch(previous())}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-200 bg-black rounded hover:bg-gray-900 hover:text-white"
              >
                <svg
                  className="w-3.5 h-3.5 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 5H1m0 0 4 4M1 5l4-4"
                  />
                </svg>
                Prev
              </button>
              <button
                onClick={() => dispatch(next())}
                className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-200 bg-black rounded hover:bg-gray-900 hover:text-white"
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-lg container my-2 mx-auto px-4 md:px-12 lg:px-28 flex justify-center items-center h-[400px]">
          There are no products in this shop.
        </div>
      )}
    </>
  );
}
