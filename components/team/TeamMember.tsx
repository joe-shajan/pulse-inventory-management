"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components";

const validationSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Must be a valid email",
  }),
  role: z.string().min(1, { message: "role is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

type AddTeamMemberFormType = {
  shopId: string;
  toggle: () => void;
};

export const AddTeamMemberForm = ({
  shopId,
  toggle,
}: AddTeamMemberFormType) => {
  const queryClient = useQueryClient();

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
      return axios.post(`/api/shop/${shopId}/team`, data);
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["team"], (oldData: any) => [
        ...oldData,
        data.newTeamMember,
      ]);

      toggle();
      toast.success("Team member added successfully");
    },
    onError: () => {
      toast.error("Adding team member failed");
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
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.email && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="email"
          type="text"
          placeholder="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="role"
        >
          Role
        </label>
        <select
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.role && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="role"
          {...register("role")}
          defaultValue="MANAGER" // Set "MANAGER" as the default value
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
        </select>
        {errors.role && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.role?.message}
          </p>
        )}
      </div>

      <div className="text-center">
        <Button className="w-full " type="submit">
          Add User
        </Button>
      </div>
    </form>
  );
};

type AddTeamMemberProps = {
  toggle: () => void;
  shopId: string;
};

export const AddTeamMember = ({ toggle, shopId }: AddTeamMemberProps) => {
  return (
    <div className="max-w-xl mx-auto my-auto py-4 w-full">
      <div className="flex justify-center">
        <div className="w-full lg:w-11/12">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add new User</h3>
            <div
              className="text-lg cursor-pointer hover:bg-slate-100 p-1 rounded-lg"
              onClick={toggle}
            >
              X
            </div>
          </div>
          <AddTeamMemberForm shopId={shopId} toggle={toggle} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};
