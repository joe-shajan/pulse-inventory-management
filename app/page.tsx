"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/utils/prisma";
import { User } from "@/types";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LogoutButton from "./components/LogoutButton";

export default async function Home() {
  // async function getUsers() {
  //   return (await axios.get("/api/user").then((data) => data.data)) as User[];
  // }

  // const { data: users } = useQuery<User[]>({
  //   queryKey: ["stream-hydrate-users"],
  //   queryFn: () => getUsers(),
  //   // suspense: true,
  //   // staleTime: 5 * 1000,
  // });

  // const mutation = useMutation({
  //   mutationFn: (user: User) => {
  //     return axios.post("/api/user", user);
  //   },
  // });

  const getCurrentUser = async () => {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) return;
      const currentUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      console.log(currentUser);

      if (!currentUser) return;

      return currentUser;
    } catch (e: any) {
      console.log(e);
      // simply ignores if no user is logged in
      return;
    }
  };

  const user = await getCurrentUser();

  if (!user)
    return (
      <>
        <h3>You are currently not logged in!</h3>
        <Link href="/auth/login">Login to my account</Link>
      </>
    );

  return (
    <>
      <div className="ps-6 pt-6">name: {user?.name}</div>
      <div className="ps-6">email: {user?.email}</div>
      <LogoutButton />
    </>
  );
}
