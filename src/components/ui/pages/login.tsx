import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";

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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

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
          <form className="space-y-4" onSubmit={handleSubmit(onLogin)}>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="username"
                    autoComplete="off"
                    placeholder="Enter your username"
                    className={`w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 ${errors.username ? "border-red-500 focus:outline-1 focus:outline-red-500" : "focus:outline-2 focus:outline-indigo-500"}`}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                )}
              />
              {errors.username?.message && (
                <small className="font-semibold text-red-500">
                  {errors.username?.message}
                </small>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <Controller
                control={control}
                name="password"
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    autoComplete="off"
                    placeholder="Enter your password"
                    className={`w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 ${errors.password ? "border-red-500 focus:outline-1 focus:outline-red-500" : "focus:outline-2 focus:outline-indigo-500"}`}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                )}
              />
              {errors.password?.message && (
                <small className="font-semibold text-red-500">
                  {errors.password?.message}
                </small>
              )}
            </div>

            {isError && (
              <small className="font-semibold text-red-500">
                Username or password is incorrect.
              </small>
            )}

            <button
              type="submit"
              className="mt-4 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
