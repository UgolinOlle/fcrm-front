import {createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";

import {ProjectDao} from "@/utils/dao/project-dao";
import {Project} from "@/utils/interfaces/project";

export const getAllProjects = createAsyncThunk('project/getAll', async () => {
    return await ProjectDao.getAllProjects();
})

export const getProjectById = createAsyncThunk('project/getById', async (id: string) => {
    return await ProjectDao.getProjetById(id)
})