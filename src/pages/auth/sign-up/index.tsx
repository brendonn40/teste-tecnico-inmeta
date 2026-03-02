import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useSignUp } from "@/features/auth/hooks/useSignUp";
import { type UserForm, UserFormSchema } from "@/features/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export function SignUp() {
  const navigate = useNavigate();

  const { mutate, isPending } = useSignUp();

  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {},
  });

  async function onSubmit(values: UserForm) {
    mutate(values, {
      onSuccess: () => {
        toast.success('Conta criada com sucesso! Por favor, faça o login.');
        navigate('/login');
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.message === 'User already exists' ? 'Email já cadastrado!' : 'Ocorreu um erro ao criar a conta. Tente novamente.';
        toast.error(errorMessage);
      },
    });
  }
  return (
    <Card className="mx-auto w-11/12 md:w-1/2">
      <CardHeader>
        <CardTitle className="text-xl">Cadastre se</CardTitle>
        <CardDescription>
          Preencha as informações para criar sua conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="nome" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="nome@exemplo.com"
                      />
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
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" loading={isPending}>
                Criar conta
              </Button>

            </div>
            <div className="mt-4 text-center text-sm">
              Já tem um cadastro?{" "}
              <Link to="/login" className="underline">
                Faça seu login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
