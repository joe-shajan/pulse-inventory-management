"use client";
import { Button } from "@/components";
import "../shop.css";

import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import UsersTable from "@/components/users/UsersTable";
import { CreateUser } from "@/components/users/CreateUser";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/services/TeamsServices";

export default function Page({ params }: any) {
  const { id } = params;
  const { isOpen, toggle } = useModal();

  const {
    data: teamMembers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["team"],
    queryFn: () => getTeamMembers(id),
  });

  if (error) {
    return <div>Could not fetch team members</div>;
  }

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateUser toggle={toggle} />
      </Modal>
      <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
        <Button onClick={toggle}>Add New User</Button>
      </div>
      {isLoading ? (
        <div className="container my-2 mx-auto px-4 md:px-12 lg:px-28">
          loading team members...
        </div>
      ) : teamMembers ? (
        <UsersTable teamMembers={teamMembers} />
      ) : null}
    </>
  );
}
