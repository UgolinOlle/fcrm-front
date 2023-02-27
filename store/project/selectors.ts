import {createSelector} from "reselect";
import {ProjectState} from "@/store/project/reducers";

export const selectProjects = createSelector(
    (state: { project: ProjectState }) => state.project.projects,
    (projects) => projects
)