import React from "react";
import { TeamMemberWithUser, TeamMember } from "@/types";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

type UserRowProps = {
  teamMember: TeamMemberWithUser;
  shopId: string;
  i: number;
};

const UserRow = ({ teamMember, shopId, i }: UserRowProps) => {
  const { user, role, id } = teamMember;
  const mutation = useMutation({
    mutationFn: (teamMemberId: string) => {
      return axios.delete(`/api/shop/${shopId}/team/${teamMemberId}`);
    },
    onSuccess: () => {
      // refetch();
      toast.success("User removed successfully");
    },
    onError: () => {
      toast.error("Removing user failed");
    },
  });

  return (
    <tr
      key={id}
      className={`flex rounded-lg rounded-s-none flex-col flex-no wrap sm:table-row mb-2 border-grey-light md:border-b border border-l-0 sm:mb-0 hover:bg-slate-100 ${
        i % 2 === 0 ? "bg-slate-50" : ""
      }`}
    >
      <td className="p-3">{user.email}</td>
      <td className="p-3 truncate">{role}</td>
      <td className="flex gap-3 p-3">
        <span className="text-blue-500 hover:text-blue-600">Edit</span>
        <span
          className="text-red-500 hover:text-red-600 cursor-pointer"
          onClick={() => mutation.mutate(id)}
        >
          {mutation.isLoading ? "Removing..." : "Remove"}
        </span>
      </td>
    </tr>
  );
};

type UsersTableProps = {
  teamMembers: TeamMemberWithUser[];
  shopId: string;
};

const UsersTable = ({ teamMembers, shopId }: UsersTableProps) => {
  return (
    <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
      <table className="w-full flex flex-row r flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-gray-700 ">
          {Array(teamMembers.length)
            .fill(0)
            .map((i) => (
              <tr
                key={i}
                className="bg-slate-100 border-grey-light md:border-0 border border-r-0 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              >
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>

                <th className="p-3 text-left w-[100px]">Actions</th>
              </tr>
            ))}
        </thead>
        <tbody className="flex-1 sm:flex-none border-grey-light md:border-0 borde">
          {teamMembers.map((teamMember, i) => (
            <UserRow
              key={teamMember.id}
              teamMember={teamMember}
              shopId={shopId}
              i={i}
            />
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default UsersTable;
