"use client";
import { User } from "@/types";
import React from "react";
import { Button } from "./Button";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type Props = { user: User | null };

const Header = ({ user }: Props) => {
  const pathname = usePathname();

  const isSignupOrLogin =
    pathname === "/auth/login" || pathname === "/auth/signup";

  return (
    <div className="h-16 bg-slate-100 w-full flex justify-around items-center">
      <div>
        <Link href="/">
          <h1 className="text-lg font-semibold">Inventory management</h1>
        </Link>
      </div>
      {isSignupOrLogin ? (
        <div></div>
      ) : user ? (
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
