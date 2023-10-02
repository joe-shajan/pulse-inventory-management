"use client";

import { Button } from "@/components";
import Modal from "@/components/Modal";
import { CreateShop } from "@/components/shop/CreateShop";
import ShopCard from "@/components/shop/ShopCard";
import useModal from "@/hooks/useModal";

export default function Home() {
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
}
