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
import { useState } from "react";
import { Product } from "@/types";

// export default function Page({ params }: any) {
//   const { id } = params;
//   const { isOpen, toggle, openModal, closeModal } = useModal();

//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);

//   const {
//     data: products,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["products"],
//     queryFn: () => getProducts(id),
//   });

//   const { data: userRole } = useQuery({
//     queryKey: ["userRole"],
//     queryFn: () => getUserRole(id),
//   });

//   useEffect(() => {
//     if (editingProduct) {
//       openModal();
//     } else {
//       closeModal();
//     }
//   }, [closeModal, editingProduct, openModal]);

//   if (error) {
//     return <div>could not fetch products</div>;
//   }

//   return (
//     <>
//       <Modal isOpen={isOpen} toggle={toggle}>
//         <CreateProduct
//           userRole={userRole || "MANAGER"}
//           toggle={toggle}
//           shopId={id}
//           editingProduct={editingProduct}
//           setEditingProduct={setEditingProduct}
//         />
//       </Modal>
//       {userRole === "ADMIN" ? (
//         <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
//           <Link href={`/shop/${id}/team`}>
//             <Button className="bg-slate-200 text-black hover:bg-slate-300">
//               Manage users
//             </Button>
//           </Link>
//           <Button onClick={toggle}>Add New Product</Button>
//         </div>
//       ) : null}

//       {isLoading ? (
//         <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
//           loading Products...
//         </div>
//       ) : products?.length ? (
//         <ProductsTable
//           shopId={id}
//           products={products}
//           userRole={userRole || "MANAGER"}
//           setEditingProduct={setEditingProduct}
//         />
//       ) : (
//         <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
//           Products not found add new
//         </div>
//       )}
//     </>
//   );
// }

import { getInfiniteProducts } from "@/services";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";

export default function Page({ params }: any) {
  const { id: shopId } = params;

  const { isOpen, toggle, openModal, closeModal } = useModal();

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: userRole } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => getUserRole(shopId),
  });

  useEffect(() => {
    if (editingProduct) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, editingProduct, openModal]);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: (ctx: any) => getInfiniteProducts(shopId, 10, ctx.pageParam),

    getNextPageParam: (lastPage) => lastPage.nextSkip ?? false,
  });

  const allRows = data ? data.pages.flatMap((d: { rows: any }) => d.rows) : [];

  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef?.current || null,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  const totalSize = rowVirtualizer.getTotalSize();
  // return (
  //   <>
  //     <Modal isOpen={isOpen} toggle={toggle}>
  //       <CreateProduct
  //         userRole={userRole || "MANAGER"}
  //         toggle={toggle}
  //         shopId={shopId}
  //         editingProduct={editingProduct}
  //         setEditingProduct={setEditingProduct}
  //       />
  //     </Modal>
  //     {userRole === "ADMIN" ? (
  //       <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
  //         <Link href={`/shop/${shopId}/team`}>
  //           <Button className="bg-slate-200 text-black hover:bg-slate-300">
  //             Manage users
  //           </Button>
  //         </Link>
  //         <Button onClick={toggle}>Add New Product</Button>
  //       </div>
  //     ) : null}
  //     <div>
  //       {status === "loading" ? (
  //         <p>Loading...</p>
  //       ) : status === "error" ? (
  //         <span>Error: {(error as Error).message}</span>
  //       ) : (
  //         <div
  //           // @ts-ignore
  //           ref={parentRef}
  //           className="h-[500px] w-full overflow-auto"
  //         >
  //           <div className={`w-full relative h-[${totalSize}px]`}>
  //             {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
  //               const isLoaderRow = virtualRow.index > allRows.length - 1;
  //               const product = allRows[virtualRow.index];
  //               const { start, index } = virtualRow;

  //               return (
  //                 <div
  //                   key={index}
  //                   className={`absolute top-0 left-0 w-full flex items-center justify-around h-[100px] border border-black`}
  //                   style={{
  //                     transform: `translateY(${start}px)`,
  //                   }}
  //                 >
  //                   {isLoaderRow ? (
  //                     hasNextPage ? (
  //                       "Loading more..."
  //                     ) : (
  //                       "Nothing more to load"
  //                     )
  //                   ) : (
  //                     <>
  //                       <div>{product.name}</div>
  //                       <div>{product.description}</div>
  //                       <div>{product.price}</div>
  //                       <div>{product.tags}</div>
  //                       <div>{product.stock}</div>
  //                     </>
  //                   )}
  //                 </div>
  //               );
  //             })}
  //           </div>
  //         </div>
  //       )}
  //       <div>
  //         {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateProduct
          userRole={userRole || "MANAGER"}
          toggle={toggle}
          shopId={shopId}
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
        />
      </Modal>
      {userRole === "ADMIN" ? (
        <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
          <Link href={`/shop/${shopId}/team`}>
            <Button className="bg-slate-200 text-black hover:bg-slate-300">
              Manage users
            </Button>
          </Link>
          <Button onClick={toggle}>Add New Product</Button>
        </div>
      ) : null}
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {(error as Error).message}</span>
        ) : (
          <div
            // @ts-ignore
            ref={parentRef}
            className="h-[500px] w-full overflow-auto bg-yellow-400"
          >
            <div className={`w-full relative h-[${totalSize}px] bg-red-400`}>
              {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
                const isLoaderRow = virtualRow.index > allRows.length - 1;
                const product = allRows[virtualRow.index];
                const { start, index } = virtualRow;

                return (
                  <div
                    key={index}
                    className={`absolute top-0 bg-green-400 left-0 w-1/3 flex items-center justify-around h-[100px] border border-black`}
                    style={{
                      transform: `translateY(${start}px)`,
                    }}
                  >
                    {isLoaderRow ? (
                      hasNextPage ? (
                        "Loading more..."
                      ) : (
                        "Nothing more to load"
                      )
                    ) : (
                      <>
                        <div>{product.name}</div>
                        <div>{product.description}</div>
                        <div>{product.price}</div>
                        <div>{product.tags}</div>
                        <div>{product.stock}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
      </div>
    </>
  );
}
