export class User {
  id?: string;
  userName?: string;
  password?: string;
  nome?: string;
  cpf?: string;
  role?: UserRole;
  isAdmin?: boolean;
  token?:string;
  lockoutEnabled?: boolean;
}

export enum UserRole {
  ADMIN,
  RESTOCKER,
  CLIENT
}