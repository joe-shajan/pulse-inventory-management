import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Shop } from "@/types";

type Props = {
  shop: Shop;
};

const ShopCard = ({ shop }: Props) => {
  console.log(shop);

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <Link href={`/shop/${shop.id}`}>
        <article className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl border-slate-200 border p-3 md:p-0">
          <header className=" leading-tight p-2 md:p-4">
            <h1 className="text-lg">
              <a className="no-underline hover:underline text-black" href="#">
                Name: {shop.name}
              </a>
            </h1>
            <p className="text-grey-darker text-sm mt-2">Bio: {shop.bio}</p>
          </header>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <p className="text-sm">Place: {shop.address}</p>
          </footer>
        </article>
      </Link>
    </div>
  );
};

export default ShopCard;
