export interface AuthLogout {
  id: string;
}

export interface AuthOutput {
  message: string | null;
  accessToken: string;
}

export interface AuthErrorResponse {
  error: string;
  message: string;
}

export interface AuthLogin {
  email: string;
  password: string;
}
