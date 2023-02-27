import {useRouter} from "next/router";
import {AppDispatch} from "@/store/store";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Project} from "@/utils/interfaces/project";
import {getProjectById} from "@/store/project/actions";
import {DashboardLayout} from "@/layouts/dashboard-layout";

export default function Projects() {
    const router = useRouter()
    const {id} = router.query;
    const dispatch: AppDispatch = useDispatch()
    const [project, setProject] = useState<Project>()
    const getProject = async (id: string) => {
        const data = await dispatch(getProjectById(id))
    }

    useEffect(() => {
        if (id) {
            if (typeof id === 'string') {
                getProjectById(id)
            }
        }
    })

    return (
        <DashboardLayout>
            <h1 className='h1'>{project?.name}</h1>
        </DashboardLayout>
    )
}