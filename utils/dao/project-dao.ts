import {$api} from "@/utils/api";
import {Project} from "@/utils/interfaces/project";

export class ProjectDao {
    static getAllProjects(): Promise<Project[]> {
        return $api.get('/project').then((res) => {
            return res.data
        }).catch((e) => {
            throw e.response
        })
    }

    static getProjetById(id: string): Promise<Project> {
        return $api.get(`/project/${id}`).then((res) => {
            return res.data
        }).catch((e) => {
            throw e.response
        })
    }
}