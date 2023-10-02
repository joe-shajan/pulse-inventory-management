"use client";
import { Button } from "@/components";
import "../shop.css";

import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import UsersTable from "@/components/users/UsersTable";
import { CreateUser } from "@/components/users/CreateUser";

export default function Page({ params }: any) {
  const { id } = params;
  const { isOpen, toggle } = useModal();
  console.log(id);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <CreateUser toggle={toggle} />
      </Modal>
      <div className="flex gap-3 justify-end px-4 md:px-12 lg:px-28 mt-6 mb-2">
        <Button onClick={toggle}>Add New User</Button>
      </div>

      <UsersTable />
    </>
  );
}
