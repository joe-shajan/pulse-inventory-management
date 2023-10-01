"use client";

import React from "react";
import { Button } from "../Button";
import ShopCard from "./ShopCard";
import Modal from "../Modal";
import useModal from "@/hooks/useModal";
import { CreateShop } from "./CreateShop";

export const ShopContainer = () => {
  const { isOpen, toggle } = useModal();

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateShop toggle={toggle} />
      </Modal>
      <div className="flex justify-end px-4 md:px-12 lg:px-28 mt-6">
        <Button onClick={toggle}>Create New Shop</Button>
      </div>
      <div className="container my-4 mx-auto px-4 md:px-12 lg:px-28">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <ShopCard key={num} />
          ))}
        </div>
      </div>
    </>
  );
};
