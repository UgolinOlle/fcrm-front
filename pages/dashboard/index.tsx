import React from 'react';
import { Box, CircleOcticon, Label } from '@primer/react';
import {
  CheckCircleIcon,
  PeopleIcon,
  FileSubmoduleIcon,
} from '@primer/octicons-react';
import { useSelector } from 'react-redux';

import { selectUsers } from '@/store/user/selectors';
import { selectProjects } from '@/store/project/selectors';
import { EntityStatus } from '@/utils/enums/entity-status';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import style from '@/styles/Cards.module.css';
import cardStyle from '@/styles/Cards.module.css';

export default function Dashboard() {
  // -- Date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // -- User
  const usersList = useSelector(selectUsers);
  const newUsers = usersList.filter((user) => {
    const createdAt = new Date(user.createdAt);
    return (
      createdAt.getFullYear() === currentYear &&
      createdAt.getMonth() === currentMonth
    );
  });
  const usersActive = usersList.filter(
    (user) => user.status === EntityStatus.ACTIVE,
  );
  const userIncrease = (usersList.length / newUsers.length) * 100;

  // -- Projects
  const projectsList = useSelector(selectProjects);
  const newProjects = projectsList.filter((project) => {
    const createdAt = new Date(project.createdAt);
    return (
      createdAt.getFullYear() === currentYear &&
      createdAt.getMonth() === currentMonth
    );
  });
  const projectsIncrease = (projectsList.length / newProjects.length) * 100;

  return (
    <DashboardLayout>
      <h1 className="h1">Dashboard</h1>
      <Box marginY="2rem">
        <h2 className="h2">Clients stats</h2>
        <Box marginY="2rem" display="flex" justifyContent="start" width="100%">
          <div className={`${cardStyle.InfoCards} border rounded-3 p-3 mr-2`}>
            <CircleOcticon
              icon={PeopleIcon}
              size={32}
              sx={{ bg: 'success.fc', color: 'fg.default' }}
            />
            <Box display="flex" flexDirection="column" marginTop="2rem">
              <h4 className="h4 color-fg-muted">Total clients</h4>
              <div className="d-flex flex-justify-between flex-items-center mt-2">
                <h2 className="h2">{usersList.length}</h2>
                <Label variant="primary">+ {userIncrease}%</Label>
              </div>
            </Box>
          </div>
          <div className={`${cardStyle.InfoCards} border rounded-3 p-3 mx-2`}>
            <CircleOcticon
              icon={CheckCircleIcon}
              size={32}
              sx={{ bg: 'success.fc', color: 'fg.default' }}
            />
            <Box display="flex" flexDirection="column" marginTop="2rem">
              <h4 className="h4 color-fg-muted">Active clients</h4>
              <div className="d-flex flex-justify-between flex-items-center mt-2">
                <h2 className="h2">{usersActive.length}</h2>
              </div>
            </Box>
          </div>
        </Box>
      </Box>
      <Box marginY="2rem">
        <h2 className="h2">Projects stats</h2>
        <Box marginY="2rem" display="flex" justifyContent="start" width="100%">
          <div className={`${style.InfoCards} border rounded-3 p-3 mr-2`}>
            <CircleOcticon
              icon={FileSubmoduleIcon}
              size={32}
              sx={{ bg: 'success.fc', color: 'fg.default' }}
            />
            <Box display="flex" flexDirection="column" marginTop="2rem">
              <h4 className="h4 color-fg-muted">Total projects</h4>
              <div className="d-flex flex-justify-between flex-items-center mt-2">
                <h2 className="h2">{projectsList.length}</h2>
                <Label variant="primary">+ {projectsIncrease}%</Label>
              </div>
            </Box>
          </div>
        </Box>
      </Box>
    </DashboardLayout>
  );
}
