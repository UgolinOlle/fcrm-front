import {Project} from "@/utils/interfaces/project";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAllProjects} from "@/store/project/actions";

export interface ProjectState {
    projects: Project[],
    error: any | null
}

const initialState: ProjectState = {
    projects: [],
    error: null
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload
        })
    }
})

export default projectSlice.reducer;