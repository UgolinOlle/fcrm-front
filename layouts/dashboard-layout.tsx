import {Box} from "@primer/react";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import {Navbar} from "@/components/dashboard/navbar/Navbar";
import {DHeader} from "@/components/dashboard/header/DHeader";
import {AppDispatch} from "@/store/store";
import {getAllUser} from "@/store/user/actions";
import {getAllProjects} from "@/store/project/actions";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({children}) => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUser())
        dispatch(getAllProjects())
    }, [])

    return (
        <Box display='flex'>
            <Navbar/>
            <Box display='flex' flexDirection='column' width='90%'>
                <DHeader/>
                <div className='mx-6 mt-10'>
                    {children}
                </div>
            </Box>
        </Box>
    )
}