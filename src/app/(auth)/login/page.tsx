"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema, loginSchemaType } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { axiosInstance } from "@/api/instance";
import { useAuthStore, useUserStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Page() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const { setTokens } = useAuthStore();
  const { setUser } = useUserStore();
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: loginSchemaType) => {
    try {
      const { data: credentials } = await axiosInstance.post(
        "/users/login",
        data
      );
      setTokens(credentials.access_token, credentials.refresh_token);

      const { data: me } = await axiosInstance.get("/users/me");
      setUser(me);

      router.push("/stores/");
    } catch (error) {
      console.log("error post", error);
      toast("Erro ao realizar login", {
        description: error.response.data.detail,
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      router.push("/stores/");
    }
  }, [accessToken]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          className="w-[500px] flex flex-col gap-y-6 border p-4 rouded shadow-lg rounded-md"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <p className="text-center text-2xl font-semibold">Login</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPass ? "text" : "password"}
                      placeholder="Insira a senha"
                      {...field}
                    />
                    <div
                      className="absolute top-2 right-2.5"
                      onClick={() => setShowPass(!showPass)}
                    >
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Entrar</Button>
        </form>
      </Form>
    </div>
  );
}
