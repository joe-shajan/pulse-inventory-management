"use client";
import { Button } from "@/components";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      let user = await signIn("credentials", loginData);
      console.log(user);
      setAlert({ status: "success", message: "Login successfully" });
      setLoginData({ email: "", password: "" });
      //   redirect("/");
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: "error", message: "Something went wrong" });
    }
  };

  return (
    <div>
      <h3>Login Page</h3>
      {alert.message && (
        <div
          style={{
            color: alert.status === "success" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {alert.status === "success" ? "✅" : "❌"} {alert.message}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email </label>
          <input
            className="bg-slate-200"
            onChange={onChange}
            value={loginData.email}
            type="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            className="bg-slate-200"
            onChange={onChange}
            value={loginData.password}
            type="password"
            name="password"
            required
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
      <div>
        Do not have an account?
        <Link href="/auth/register">Create an account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
