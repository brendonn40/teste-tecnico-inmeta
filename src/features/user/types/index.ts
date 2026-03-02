import { z } from 'zod';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
}

export interface UserForm {
  id?: string;
  name: string;
  password: string;
  email: string;
}

export const UserFormSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(1, { message: 'Campo obrigatório' }),
  email: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .email({ message: "Deve ser um email válido!" }),
  password: z
    .string({
      required_error: 'Campo obrigatório',
    })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres!" }),



});
