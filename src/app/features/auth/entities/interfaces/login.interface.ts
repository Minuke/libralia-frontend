import { UserDetails } from "@shared/entities/interfaces/user.interface";

export interface Login {
  username?: string;
  email?: string;
  password: string;
}

export interface JWT {
  access: string;
  refresh: string;
  user: UserDetails;
}