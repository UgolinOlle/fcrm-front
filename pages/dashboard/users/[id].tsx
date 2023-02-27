import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";

import {AppDispatch} from "@/store/store";
import {DashboardLayout} from "@/layouts/dashboard-layout";
import {getUserById} from "@/store/user/actions";
import {User} from "@/utils/interfaces/user";

export default function Users() {
    const router = useRouter();
    const {id} = router.query;
    const dispatch: AppDispatch = useDispatch();
    const [user, setUser] = useState<User>();
    const getUser = async (id: string) => {
        const data = await dispatch(getUserById(id))
        setUser(data.payload as User)
    }

    useEffect(() => {
        if (id) {
            if (typeof id === "string") {
                getUser(id)
            }
        }
    }, [])

    return (
        <DashboardLayout>
            <h1 className='h1'>{user?.firstName} {user?.lastName}</h1>
        </DashboardLayout>
    )
}