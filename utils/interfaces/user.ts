import { Roles } from "../enums/roles";
import { EntityStatus } from "../enums/entity-status";
import { Project } from "@/utils/interfaces/project";

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  role: Roles;
  status: EntityStatus;
  projects: Project;
}

export interface UserCreate {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Roles;
}

export interface UserCreateOutput {
  user: User;
}

export interface UserUpdate {
  id: string;
  user: Partial<User>;
}
