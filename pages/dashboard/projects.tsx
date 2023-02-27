import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@primer/react';
import { CircleOcticon, Label } from '@primer/react';
import { PeopleIcon } from '@primer/octicons-react';

import { DashboardLayout } from '@/layouts/dashboard-layout';
import { ListProjects } from '@/components/dashboard/list-projects/ListProjects';
import { selectProjects } from '@/store/project/selectors';
import style from '@/styles/Cards.module.css';

export default function Projects() {
  // -- States
  const projectsList = useSelector(selectProjects);

  // -- Date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // -- Projects
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
      <h1 className="h1">Projects</h1>
      <Box marginY="2rem" display="flex" justifyContent="start" width="100%">
        <div className={`${style.InfoCards} border rounded-3 p-3 mr-2`}>
          <CircleOcticon
            icon={PeopleIcon}
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
      <Box borderRadius={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2 className="h2">Prospects List</h2>
          <Button variant="primary">New project</Button>
        </Box>
        <ListProjects projects={projectsList} />
      </Box>
    </DashboardLayout>
  );
}
