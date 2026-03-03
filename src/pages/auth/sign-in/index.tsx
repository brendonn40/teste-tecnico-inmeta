import { useAuth } from "@/components/providers/auth";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { type LoginForm, LoginSchema } from '@/features/auth/types';

export function SignIn() {
  const { signIn, isLoading } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: '',
      email: '',
    },
  });

  async function onSubmit(values: LoginForm) {
    signIn(values.email, values.password);
  }

  return (
    <Card className="mx-auto w-11/12 md:w-96">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Bem vindo</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
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
                    <div className="flex items-center">
                      <FormLabel>Senha</FormLabel>
                    </div>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" loading={isLoading}>
                Login
              </Button>

            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta ?{" "}
              <Link to="/sign-up" className="underline">
                Cadastre se
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
