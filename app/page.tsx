"use client";

import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

async function getUsers() {
  return (await axios.get("/api/user").then((data) => data.data)) as User[];
}

export default function Home() {
  const { data: users } = useQuery<User[]>({
    queryKey: ["stream-hydrate-users"],
    queryFn: () => getUsers(),
    // suspense: true,
    // staleTime: 5 * 1000,
  });

  console.log(users);

  const mutation = useMutation({
    mutationFn: (user: User) => {
      return axios.post("/api/user", user);
    },
  });

  return (
    <div className="p-6">
      {users?.map((user) => (
        <div key={user.id} className="my-4">
          <p className="text-xl">id: {user.id}</p>
          <p className="text-xl">name: {user.name}</p>
        </div>
      ))}
      <button
        className="p-4 bg-black text-white rounded-xl m-4"
        onClick={() => {
          mutation.mutate({
            name: "joe",
            email: "jo@gmail.com",
            password: "joppan",
          });
        }}
      >
        add user
      </button>
    </div>
  );
}
