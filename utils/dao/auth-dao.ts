import { $api } from "../api";
import { AuthLogin, AuthLogout, AuthOutput } from "@/utils/interfaces/auth";

export class AuthDao {
  static login(user: AuthLogin): Promise<AuthOutput> {
    return $api
      .post("/auth/login", user)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }

  static logout(user: AuthLogout): Promise<AuthLogout> {
    return $api
      .post(`/auth/logout?id=${user.id}`)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response;
      });
  }
}
