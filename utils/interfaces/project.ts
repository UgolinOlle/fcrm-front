import {ProjectType} from "@/utils/enums/project-type";
import {EntityStatus} from "@/utils/enums/entity-status";
import {User} from "@/utils/interfaces/user";

export interface Project {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    project_type: ProjectType;
    active: EntityStatus;
    user: User;
}