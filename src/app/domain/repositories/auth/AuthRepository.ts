export interface AuthResponse {
    user: any;
    session: any;
}

export interface IAuthRepository {
    signUp(email: string, password: string): Promise<AuthResponse>;
    signIn(email: string, password: string): Promise<AuthResponse>;
    signOut(): Promise<void>;
}