import { $api } from "../api";
import {
  User,
  UserCreate,
  UserCreateOutput,
  UserUpdate,
} from "../interfaces/user";

export class UserDao {
  static getAllUsers(): Promise<User[]> {
    return $api
      .get("/user")
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw e.response;
      });
  }

  static getUserById(id: string): Promise<User> {
    return $api
      .get(`/user/${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw e.response;
      });
  }

  // -- Actions
  static create(user: UserCreate): Promise<UserCreateOutput> {
    return $api
      .post("/user/signup", user)
      .then((res) => res.data)
      .catch((e) => {
        throw e.response;
      });
  }

  static update({ id, user }: UserUpdate): Promise<User> {
    return $api
      .put(`/user/${id}`, user)
      .then((res) => res.data)
      .catch((e) => {
        throw e.response;
      });
  }

  static delete(id: string): Promise<string> {
    return $api
      .delete(`/user/${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw e.response;
      });
  }

  static sendMail(): Promise<any> {
    const accessToken = localStorage.getItem("accessToken");

    return $api
      .post(
        "/user/mail",
        {
          to: "ugolinolle@gmail.com",
          subject: "This is a big brain!",
          body: "What's up bro!",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
  }
}
