"use client";
import { Button } from "@/components";
import "../shop.css";

import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import UsersTable from "@/components/team/TeamMembersTable";
import { AddTeamMember } from "@/components/team/TeamMember";
import { useQuery } from "@tanstack/react-query";
import { getTeamMembers } from "@/services/TeamsServices";
import { getUserRole } from "@/services";

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

  const { data: userRole } = useQuery({
    queryKey: ["userRole"],
    queryFn: () => getUserRole(id),
  });

  if (error) {
    return <div>Could not fetch team members</div>;
  }

  return (
    <>
      {userRole === "ADMIN" ? (
        <>
          <Modal isOpen={isOpen} toggle={toggle}>
            <AddTeamMember toggle={toggle} shopId={id} />
          </Modal>
          <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
            <Button onClick={toggle}>Add team member</Button>
          </div>
        </>
      ) : null}

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
