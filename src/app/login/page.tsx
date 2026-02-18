"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LoginFormValues, loginSchema } from "@/schemas/login.schema";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    const res = await signIn("credentials", {
      redirect: false,
      login: data.login,
      password: data.password,
    });

    if (res?.error) {
      setServerError("Неверный логин или пароль");
      return;
    }

    router.push("/admin-news");
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-6 mt-6"
      >
        <div className="space-y-1">
          <Label className="md:text-base">Логин</Label>
          <Input
            {...register("login")}
            placeholder="Введите логин"
            className="md:h-12 md:text-base"
            autoComplete="username"
          />
          {errors.login && (
            <p className="text-sm md:text-base text-destructive">
              {errors.login.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label className="md:text-base">Пароль</Label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Введите пароль"
            className="md:h-12 md:text-base"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm md:text-base text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {serverError && (
          <p className="text-sm md:text-base text-destructive">{serverError}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:h-12 md:text-base text-white"
        >
          {isSubmitting ? "Входим…" : "Войти"}
        </Button>
      </form>
    </div>
  );
}
