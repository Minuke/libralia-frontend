export interface UserDetails {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface PasswordChange {
  new_password1: string;
  new_password2: string;
}

export interface ProfileEditParams {
  username?: string;
  email?: string;
}