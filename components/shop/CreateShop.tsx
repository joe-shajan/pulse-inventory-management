"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components";

const validationSchema = z.object({
  shopname: z.string().min(1, { message: "name is required" }),
  shopbio: z.string().min(1, { message: "shopbio is required" }),
  address: z.string().min(1, { message: "address is required" }),
  latitude: z.string().min(1, { message: "latitude is required" }),
  longitude: z.string().min(1, { message: "longitude is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const CreateShopForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    // @ts-ignore
    resolver: zodResolver(validationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: ValidationSchema) => {
      return axios.post("/api/auth/signup", data);
    },
    onSuccess: () => {
      toast.success("Signup successfull");
      redirect("/");
    },
    onError: () => {
      toast.error("Signup failed");
    },
  });

  return (
    <form
      className="px-8 pt-6 pb-2 mb-4"
      onSubmit={handleSubmit((formData) => mutation.mutate(formData))}
    >
      <div className="mb-4 md:mr-2">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="shopname"
        >
          Shop Name
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.shopname && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="shopname"
          type="text"
          placeholder="Shop Name"
          {...register("shopname")}
        />
        {errors.shopname && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.shopname?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="shopbio"
        >
          Shop Bio
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.shopbio && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="shopbio"
          type="text"
          placeholder="shop bio"
          {...register("shopbio")}
        />
        {errors.shopbio && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.shopbio?.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.address && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="address"
          type="address"
          placeholder="Address"
          {...register("address")}
        />
        {errors.address && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.address?.message}
          </p>
        )}
      </div>
      <div className="mb-6 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="latitude"
          >
            latitude
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.latitude && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="latitude"
            type="latitude"
            placeholder="76.9494540764531"
            {...register("latitude")}
          />
          {errors.latitude && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.latitude?.message}
            </p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="longitude"
          >
            longitude
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.longitude && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="longitude"
            type="longitude"
            placeholder="10.0154517675376"
            {...register("longitude")}
          />
          {errors.longitude && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.longitude?.message}
            </p>
          )}
        </div>
      </div>
      <div className="text-center">
        <Button className="w-full " type="submit">
          Create New Shop
        </Button>
      </div>
    </form>
  );
};

type CreateShopProps = {
  toggle: () => void;
};

export const CreateShop = ({ toggle }: CreateShopProps) => {
  return (
    <div className="max-w-xl mx-auto my-auto py-4 w-full">
      <div className="flex justify-center">
        <div className="w-full lg:w-11/12">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Create New Shop</h3>
            <div
              className="text-lg cursor-pointer hover:bg-slate-100 p-1 rounded-lg"
              onClick={toggle}
            >
              X
            </div>
          </div>
          <CreateShopForm />
        </div>
      </div>
      <Toaster />
    </div>
  );
};
