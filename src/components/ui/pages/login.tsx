import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Form from "../Form";

interface LoginProps {
  setSession: Dispatch<SetStateAction<string | null>>;
}

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = ({ setSession }: LoginProps) => {
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginFormData) => {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      return res;
    },
    onSuccess: (data) => {
      setSession(data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onLogin: SubmitHandler<LoginFormData> = (data) => mutate(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-indigo-50">
      <div className="flex w-sm flex-col gap-4 space-y-4 rounded-xl border border-indigo-100 bg-white p-6 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-indigo-600">
          Sign in to your account
        </h1>
        <div className="w-full max-w-sm">
          <Form
            schema={loginSchema}
            onSubmit={onLogin}
            fields={[
              {
                name: "username",
                label: "Username",
                type: "text",
                placeholder: "Insert your username",
              },
              {
                name: "password",
                label: "Password",
                type: "password",
                placeholder: "Insert your password",
              },
            ]}
            isLoading={isPending}
            defaultValues={{ username: "", password: "" }}
            isError={isError}
            isErrorLabel="Username or password is incorrect"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
