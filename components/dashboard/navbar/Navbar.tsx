import React from "react";
import {useSelector} from "react-redux";
import {Box, Heading, Label, NavList} from "@primer/react";
import {FileSubmoduleIcon, GearIcon, HomeIcon, PeopleIcon, PersonIcon} from "@primer/octicons-react";

import style from './Navbar.module.css';
import {selectUser} from "@/store/auth/selectors";

export const Navbar = () => {
    const user = useSelector(selectUser)

    return (
        <NavList className={`${style.navBar}`}>
            {/*<Image src={logo} alt='FCRM Logo' width={150} height={150}/>*/}
            <Heading sx={{fontSize: '3rem', color: 'black', textAlign: 'center'}}>FCRM</Heading>
            <NavList.Group title='General' >
                <NavList.Item href='/dashboard'>
                    Dashboard
                    <NavList.LeadingVisual>
                        <HomeIcon/>
                    </NavList.LeadingVisual>
                </NavList.Item>
                <NavList.Item href='/dashboard/clients'>
                    Clients
                    <NavList.LeadingVisual>
                        <PeopleIcon/>
                    </NavList.LeadingVisual>
                </NavList.Item>
                <NavList.Item href='/dashboard/projects'>
                    Projects
                    <NavList.LeadingVisual>
                        <FileSubmoduleIcon/>
                    </NavList.LeadingVisual>
                </NavList.Item>
            </NavList.Group>
            <NavList.Group title='Settings'>
                <NavList.Item>
                    Paramètres
                    <NavList.LeadingVisual>
                        <GearIcon/>
                    </NavList.LeadingVisual>
                </NavList.Item>
            </NavList.Group>
        </NavList>
    )
}