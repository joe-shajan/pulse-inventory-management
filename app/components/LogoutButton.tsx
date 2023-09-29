"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      className="bg-black text-white p-2 rounded-lg"
      onClick={() => signOut()}
    >
      Log out
    </button>
  );
};

export default LogoutButton;
