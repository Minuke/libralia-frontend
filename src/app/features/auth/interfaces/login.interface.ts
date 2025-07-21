export interface LoginUsernameParams {
	password: string;
	username: string;
}

export interface LoginEmailParams {
	password: string;
	email: string;
}

export interface RegisterParams {
	username: string;
	email: string;
	password1: string;
	password2: string;
}