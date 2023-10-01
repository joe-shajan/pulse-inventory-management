"use client";
import { User } from "@/types";
import React from "react";
import { Button } from "./Button";

import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = { user: User };

const Header = ({ user }: Props) => {
  return (
    <div className="h-16 bg-slate-100 w-full flex justify-around items-center">
      <div>
        <h1 className="text-lg font-semibold">Inventory management</h1>
      </div>
      {user ? (
        <>
          <div>{user?.name}</div>
          <Button onClick={() => signOut()}>Log out</Button>
        </>
      ) : (
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
