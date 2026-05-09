export class AuthError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class AuthenticationError extends AuthError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'AuthenticationError';
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor(message: string, code?: string) {
    super(message, code);
    this.name = 'UserAlreadyExistsError';
  }
}
