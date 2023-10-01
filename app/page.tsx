"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/utils/prisma";
import Header from "@/components/Header";
import { ShopContainer } from "@/components";

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

      if (!currentUser) return;

      return currentUser;
    } catch (e: any) {
      console.log(e);
      // simply ignores if no user is logged in
      return;
    }
  };

  const user = await getCurrentUser();

  return (
    <>
      <Header user={user} />
      <ShopContainer />
    </>
  );
}
