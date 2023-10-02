import { ShopContainer } from "@/components/shop/ShopContainer";

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

  return (
    <>
      <ShopContainer />
    </>
  );
}
