export interface UserDetails {
  pk: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface ProfileEditParams {
  username?: string;
  email?: string;
}