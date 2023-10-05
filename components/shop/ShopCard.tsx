import Link from "next/link";
import React from "react";
import { Shop } from "@/types";

type Props = {
  shop: Shop;
};

const ShopCard = ({ shop }: Props) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <Link href={`/shop/${shop.id}`}>
        <article className="bg-slate-50 overflow-hidden rounded-lg shadow-lg hover:shadow-xl border-slate-200 border p-3 md:p-0 text-slate-700">
          <header className="leading-tight p-2">
            <h1 className="text-xl font-semibold text-center">{shop.name}</h1>
            <p className="text-grey-darker text-sm mt-4 px-0 md:px-2 ">
              Bio: <span className="font-semibold">{shop.bio}</span>
            </p>
          </header>

          <footer className="flex flex-col leading-none px-2 md:px-4 pb-2 ">
            <p className="text-sm">
              Place: <span className="font-semibold">{shop.address}</span>
            </p>
            <p className="text-sm">
              Latitude: <span className="font-semibold">{shop.latitude}</span>
            </p>
            <p className="text-sm">
              Longitude: <span className="font-semibold">{shop.longitude}</span>
            </p>
          </footer>
        </article>
      </Link>
    </div>
  );
};

export default ShopCard;
