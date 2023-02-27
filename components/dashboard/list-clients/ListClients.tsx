import { useDispatch } from 'react-redux';
import React from 'react';
import { ActionList, ActionMenu, Box, IconButton, Label } from '@primer/react';
import {
  KebabHorizontalIcon,
  MailIcon,
  PencilIcon,
  TrashIcon,
} from '@primer/octicons-react';
import Link from 'next/link';

import { User } from '@/utils/interfaces/user';
import { Roles } from '@/utils/enums/roles';
import { AppDispatch } from '@/store/store';
import { deleteUser, getAllUser, sendMailUser } from '@/store/user/actions';
import { EntityStatus } from '@/utils/enums/entity-status';

interface ListClientsProps {
  users: User[];
}

export const ListClients: React.FunctionComponent<ListClientsProps> = ({
  users,
}) => {
  // -- States
  const sortedUsers = [...users].sort((a, b) =>
    Roles[a.role] < Roles[b.role] ? -1 : 1,
  );

  // -- Actions
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = async (id: string) => {
    return await dispatch(deleteUser(id)).then(() => {
      return dispatch(getAllUser());
    });
  };
  const handleMail = () => {
    return dispatch(sendMailUser());
  };

  // -- Render
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

      {sortedUsers.map((user, index) => (
        <Box
          display="grid"
          gridTemplateColumns="repeat(5, 1fr)"
          alignItems="center"
          paddingY={2}
          className={`border-left border-right border-bottom p-2 ${
            index === users.length - 1 ? 'rounded-bottom-3' : ''
          }`}
          key={index}
        >
          <Box p={2}>
            <Link href={`/dashboard/users/${user.id}`}>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </Link>
          </Box>
          <Box p={2}>
            <Label
              variant={
                user.role === Roles.Prospect
                  ? 'severe'
                  : user.role === Roles.Admin
                  ? 'danger'
                  : 'accent'
              }
            >
              {user.role}
            </Label>
          </Box>
          <Box p={2}>
            <Label
              variant={
                user.status === EntityStatus.INACTIVE
                  ? 'secondary'
                  : 'secondary'
              }
            >
              {user.status}
            </Label>
          </Box>
          <Box p={2}>
            <p className="mb-0">{user.email}</p>
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
                  <ActionList.Item onClick={() => handleMail()}>
                    <ActionList.LeadingVisual>
                      <MailIcon />
                    </ActionList.LeadingVisual>
                    Send mail
                  </ActionList.Item>
                  <ActionList.Item
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                  >
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
