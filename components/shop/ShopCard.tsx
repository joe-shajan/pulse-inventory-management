import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Shop } from "@/types";

type Props = {
  shop: Shop;
};

const ShopCard = ({ shop }: Props) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Link href={`/shop/${shop.id}`}>
          <Image
            width={800} // Set the desired width
            height={600} // Set the desired height
            layout="responsive" // Use responsive layout
            alt="Placeholder"
            className="block h-auto w-full"
            src="https://picsum.photos/600/400/?random"
          />
        </Link>

        <header className=" leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              {shop.name}
            </a>
          </h1>
          <p className="text-grey-darker text-sm">{shop.bio}</p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <Link
            href="/shop/123"
            className="flex items-center no-underline hover:underline text-black"
          >
            <p className="ml-2 text-sm">{shop.address}</p>
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default ShopCard;
