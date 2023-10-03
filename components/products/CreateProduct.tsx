"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components";
import { Product } from "@/types";
import { useEffect } from "react";

const validationSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  description: z.string().min(1, { message: "description is required" }),
  price: z.string().min(1, { message: "price is required" }),
  tags: z.string().min(1, { message: "tags required" }),
  stock: z.string().min(1, { message: "stock is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

type CreateProductFormProps = {
  shopId: string;
  refetch: () => void;
  toggle: () => void;
  setEditingProduct: (product: Product | null) => void;
  editingProduct: Product | null;
};

export const CreateProductForm = ({
  shopId,
  refetch,
  toggle,
  editingProduct,
  setEditingProduct,
}: CreateProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ValidationSchema>({
    // @ts-ignore
    resolver: zodResolver(validationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ValidationSchema) => {
      return axios.post(`/api/shop/${shopId}/product`, data);
    },
    onSuccess: () => {
      refetch();
      toggle();
      toast.success("Product added successfully");
    },
    onError: () => {
      toast.error("Could not add product");
    },
  });

  const editProductMutation = useMutation({
    mutationFn: (data: ValidationSchema) => {
      return axios.put(
        `/api/shop/${shopId}/product/${editingProduct?.id}`,
        data
      );
    },
    onSuccess: () => {
      refetch();
      toggle();
      setEditingProduct(null);
      toast.success("Product updated successfully");
    },
    onError: () => {
      toast.error("Could not update product");
    },
  });

  useEffect(() => {
    if (editingProduct) {
      setValue("name", editingProduct.name);
      setValue("description", editingProduct.description);
      setValue("price", editingProduct.price.toString());
      setValue("tags", editingProduct.tags);
      setValue("stock", editingProduct.stock);
    }
  }, [editingProduct]);

  return (
    <form
      className="px-8 pt-6 pb-2 mb-4"
      onSubmit={handleSubmit((formData) => {
        if (editingProduct) {
          editProductMutation.mutate(formData);
        } else {
          mutation.mutate(formData);
        }
      })}
    >
      <div className="mb-4 md:mr-2">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="name"
        >
          Product Name
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.name && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="name"
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.name?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.description && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="description"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.description?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="price"
        >
          Price
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.price && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="price"
          type="price"
          placeholder="Price"
          {...register("price")}
        />
        {errors.price && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.price?.message}
          </p>
        )}
      </div>
      <div className="mb-6 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="tags"
          >
            tags
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.tags && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="tags"
            type="tags"
            placeholder="red, glossy, fast charging"
            {...register("tags")}
          />
          {errors.tags && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.tags?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="stock"
          >
            stock
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.stock && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="stock"
            type="stock"
            placeholder="10"
            {...register("stock")}
          />
          {errors.stock && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.stock?.message}
            </p>
          )}
        </div>
      </div>
      <div className="text-center">
        <Button className="w-full " type="submit">
          {editingProduct
            ? editProductMutation.isLoading
              ? "Updating Product..."
              : "Update Product"
            : mutation.isLoading
            ? "Adding Product..."
            : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

type CreateProductProps = {
  toggle: () => void;
  refetch: () => void;
  setEditingProduct: (product: Product | null) => void;
  shopId: string;
  editingProduct: Product | null;
};

export const CreateProduct = ({
  toggle,
  shopId,
  refetch,
  editingProduct,
  setEditingProduct,
}: CreateProductProps) => {
  return (
    <div className="max-w-xl mx-auto my-auto py-4 w-full">
      <div className="flex justify-center">
        <div className="w-full lg:w-11/12">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add new product</h3>
            <div
              className="text-lg cursor-pointer hover:bg-slate-100 p-1 rounded-lg"
              onClick={() => {
                toggle();
                setEditingProduct(null);
              }}
            >
              X
            </div>
          </div>
          <CreateProductForm
            shopId={shopId}
            refetch={refetch}
            toggle={toggle}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
};
