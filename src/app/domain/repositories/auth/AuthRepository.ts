export interface IAuthRepository {
    signUp(email: string, password: string): Promise<void>;
    signIn(email: string, password: string): Promise<void>;
    signOut(): Promise<void>;
}