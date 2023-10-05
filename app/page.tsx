"use client";

import { Button } from "@/components";
import Modal from "@/components/Modal";
import { CreateShop } from "@/components/shop/CreateShop";
import ShopCard from "@/components/shop/ShopCard";
import useModal from "@/hooks/useModal";
import { getAllShops } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function Home() {
  const { isOpen, toggle } = useModal();
  const { data: session } = useSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shops"],
    queryFn: () => getAllShops(),
  });
  console.log(data);

  console.log(error);

  return (
    <>
      {session ? (
        <>
          <Modal isOpen={isOpen} toggle={toggle}>
            <CreateShop toggle={toggle} />
          </Modal>
          <div className="flex justify-end px-4 md:px-12 lg:px-28 mt-6">
            <Button onClick={toggle}>Create New Shop</Button>
          </div>
          <div className="container my-4 mx-auto px-4 md:px-12 lg:px-28">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
              {error ? (
                <div>could not fetch shops</div>
              ) : isLoading ? (
                <div>loading shops...</div>
              ) : (
                data &&
                data.map((shop) => <ShopCard key={shop.id} shop={shop} />)
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="container my-4 mx-auto px-4 md:px-12 lg:px-28">
          Login to continue
        </div>
      )}
    </>
  );
}
