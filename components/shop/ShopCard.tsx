import Image from "next/image";
import React from "react";

type Props = {};

const ShopCard = (props: Props) => {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <Image
            width={800} // Set the desired width
            height={600} // Set the desired height
            layout="responsive" // Use responsive layout
            alt="Placeholder"
            className="block h-auto w-full"
            src="https://picsum.photos/600/400/?random"
          />
        </a>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              Shop name
            </a>
          </h1>
          <p className="text-grey-darker text-sm">11/1/19</p>
        </header>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline hover:underline text-black"
            href="#"
          >
            <p className="ml-2 text-sm">Author Name</p>
          </a>
        </footer>
      </article>
    </div>
  );
};

export default ShopCard;
