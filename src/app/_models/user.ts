import { Address } from "./address";

export class User {
  id?: string;
  userName?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  nome?: string;
  cpf?: string;
  isAdmin?: boolean;
  token?:string;
  lockoutEnabled?: boolean;
  roles?: string[];
  address?: Address[];
  dataNascimento?: string;
  masculino?: boolean;
}