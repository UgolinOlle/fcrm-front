import React from 'react';
import {
  ActionList,
  ActionMenu,
  Box,
  Flash,
  IconButton,
  Label,
} from '@primer/react';
import Link from 'next/link';
import {
  KebabHorizontalIcon,
  MailIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store/store';
import { Project } from '@/utils/interfaces/project';
import { EntityStatus } from '@/utils/enums/entity-status';
import { ProjectType } from '@/utils/enums/project-type';

interface ListProjectsProps {
  projects: Project[];
}

export const ListProjects: React.FunctionComponent<ListProjectsProps> = ({
  projects,
}) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box sx={{ height: 320, overflowY: 'auto', marginY: '2rem' }}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        alignItems="center"
        className="border rounded-top-3 p-2"
      >
        <Box p={2}>Name</Box>
        <Box p={2}>Role</Box>
        <Box p={2}>Status</Box>
        <Box p={2}>Email</Box>
      </Box>

      {projects.map((project, index) => (
        <Box
          display="grid"
          gridTemplateColumns="repeat(5, 1fr)"
          alignItems="center"
          paddingY={2}
          className={`border-left border-right border-bottom p-2 ${
            index === projects.length - 1 ? 'rounded-bottom-3' : ''
          }`}
          key={index}
        >
          <Box p={2}>
            <Link href={`/dashboard/projects/${project.id}`}>
              <span>{project.name}</span>
            </Link>
          </Box>
          <Box p={2}>
            <p className="mb-0">{project.description}</p>
          </Box>
          <Box p={2}>
            <Label
              variant={
                project.project_type === ProjectType.AUTRE
                  ? 'severe'
                  : project.project_type === ProjectType.SITE_VITRINE
                  ? 'danger'
                  : 'accent'
              }
            >
              {project.project_type}
            </Label>
          </Box>
          <Box p={2}>
            <Label
              variant={
                project.active === EntityStatus.INACTIVE
                  ? 'secondary'
                  : 'secondary'
              }
            >
              {project.active}
            </Label>
          </Box>
          <Box p={2} display="flex" justifyContent="end">
            <ActionMenu>
              <ActionMenu.Anchor>
                <IconButton
                  icon={KebabHorizontalIcon}
                  variant="invisible"
                  aria-label="Open column options"
                />
              </ActionMenu.Anchor>
              <ActionMenu.Overlay>
                <ActionList>
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <PencilIcon />
                    </ActionList.LeadingVisual>
                    Update
                  </ActionList.Item>
                  <ActionList.Item>
                    <ActionList.LeadingVisual>
                      <MailIcon />
                    </ActionList.LeadingVisual>
                    Send mail
                  </ActionList.Item>
                  <ActionList.Item variant="danger">
                    <ActionList.LeadingVisual>
                      <TrashIcon />
                    </ActionList.LeadingVisual>
                    Delete
                  </ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
