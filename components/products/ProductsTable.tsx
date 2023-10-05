import React from "react";
import { Product, UserRoles } from "@/types";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type ProductsRowProps = {
  product: Product;
  setEditingProduct: (product: Product) => void;
  shopId: string;
  i: number;
  userRole: UserRoles;
};

const ProductsRow = ({
  product,
  setEditingProduct,
  shopId,
  i,
  userRole,
}: ProductsRowProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: string) => {
      return axios.delete(`/api/shop/${shopId}/product/${productId}`);
    },
    onSuccess: (_, productId) => {
      queryClient.setQueryData(["products"], (oldData: any) =>
        oldData.filter((product: any) => product.id !== productId)
      );
      toast.success("product deleted successfully");
    },
    onError: () => {
      toast.error("product deletion failed");
    },
  });

  return (
    <tr
      key={product.id}
      className={`flex rounded-lg rounded-s-none flex-col flex-no wrap sm:table-row mb-2 border-grey-light md:border-b border border-l-0 sm:mb-0 hover:bg-slate-100 ${
        i % 2 === 0 ? "bg-slate-50" : ""
      }`}
    >
      <td className="p-3">{product.name}</td>
      <td className="p-3 truncate">{product.description}</td>
      <td className="p-3 truncate">Rs. {product.price}</td>
      <td className="p-3 truncate">{product.tags}</td>
      <td className="p-3 truncate">{product.stock}</td>
      <td className="flex gap-3 p-3">
        <span
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
          onClick={() => setEditingProduct(product)}
        >
          Edit
        </span>
        {userRole === "ADMIN" ? (
          <span
            onClick={() => mutation.mutate(product.id)}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          >
            {mutation.isLoading ? "Deleting..." : "Delete"}
          </span>
        ) : null}
      </td>
    </tr>
  );
};

type ProductsTableProps = {
  products: Product[];
  userRole: UserRoles;
  shopId: string;
  setEditingProduct: (product: Product) => void;
};

// const ProductsTable = ({ products, ...props }: ProductsTableProps) => {
//   return (
//     <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
//       <table className="w-full flex flex-row r flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
//         <thead className="text-gray-700 ">
//           {Array(products.length)
//             .fill(0)
//             .map((i) => (
//               <tr
//                 key={i}
//                 className="bg-slate-100 border-grey-light md:border-0 border border-r-0 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
//               >
//                 <th className="p-3 text-left">Name</th>
//                 <th className="p-3 text-left">Description</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Tags</th>
//                 <th className="p-3 text-left">Stock</th>
//                 <th className="p-3 text-left w-[100px]">Actions</th>
//               </tr>
//             ))}
//         </thead>
//         <tbody className="flex-1 sm:flex-none border-grey-light md:border-0 borde">
//           {products.map((product, i) => (
//             <ProductsRow key={product.id} product={product} {...props} i={i} />
//           ))}
//         </tbody>
//       </table>
//       <Toaster />
//     </div>
//   );
// };
const ProductsTable = ({ products, ...props }: ProductsTableProps) => {
  return (
    <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
      <table className="w-full flex flex-row r flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-gray-700 ">
          {Array(products.length)
            .fill(0)
            .map((i) => (
              <tr
                key={i}
                className="bg-slate-100 border-grey-light md:border-0 border border-r-0 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              >
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Tags</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-left w-[100px]">Actions</th>
              </tr>
            ))}
        </thead>
        <tbody className="flex-1 sm:flex-none border-grey-light md:border-0 borde">
          {products.map((product, i) => (
            <ProductsRow key={product.id} product={product} {...props} i={i} />
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default ProductsTable;
