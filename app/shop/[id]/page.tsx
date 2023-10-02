import { Button } from "@/components";
import "./shop.css";

export default async function Page({ params }: any) {
  const { id } = params;

  console.log(id);

  return (
    <>
      <div className="flex justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
        <Button>Create New Shop</Button>
      </div>

      <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
        <table className="w-full flex flex-row r flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-gray-700">
            {[1, 2, 3, 4].map((i) => (
              <tr
                key={i}
                className="bg-slate-100 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
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
            {[1, 2, 3, 4].map((i) => (
              <tr
                key={i}
                className={`flex flex-col flex-no wrap sm:table-row mb-2 border-grey-light md:border-b border-0 sm:mb-0 hover:bg-slate-100 ${
                  i % 2 === 0 ? "bg-slate-50" : ""
                }`}
              >
                <td className="p-3">John Covv</td>
                <td className="p-3 truncate">nice product</td>
                <td className="p-3 truncate">100 rs</td>
                <td className="p-3 truncate">red, soft</td>
                <td className="p-3 truncate">11 nos</td>
                <td className="flex gap-3 p-3">
                  <span className="text-blue-500 hover:text-blue-600">
                    Edit
                  </span>
                  <span className="text-red-500 hover:text-red-600">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
