export interface IUser {
	username: string;
}

export interface IAuthContext {
	user: IUser | null;
	login: (loginInfo: ILoginReq) => Promise<boolean>;
	logout: () => void;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface ILoginReq {
	username: string;
	password: string;
}
