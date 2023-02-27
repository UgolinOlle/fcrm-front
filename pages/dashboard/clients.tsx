import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import {
  Box,
  Button,
  CircleOcticon,
  Label,
  TextInput,
  FormControl,
  Select,
} from '@primer/react';
import { CheckCircleIcon, PeopleIcon } from '@primer/octicons-react';

import { DashboardLayout } from '@/layouts/dashboard-layout';
import { ListClients } from '@/components/dashboard/list-clients/ListClients';
import { selectUsers } from '@/store/user/selectors';
import { EntityStatus } from '@/utils/enums/entity-status';
import { Roles } from '@/utils/enums/roles';
import cardStyle from '@/styles/Cards.module.css';
import clientStyle from '@/styles/Client.module.css';
import { UserDao } from '@/utils/dao/user-dao';
import { AppDispatch } from '@/store/store';
import { createUser } from '@/store/user/actions';

export default function Clients() {
  // -- State
  const [clientModal, setClientModal] = useState(false);
  const [updateClientModal, setUpdateClientModal] = useState(false);

  // -- Date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // -- Forms
  const [newClientValues, setNewClientValues] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: Roles.Prospect,
  });

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

  // -- Actions
  const dispatch: AppDispatch = useDispatch();
  const handleNewClientForm = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await dispatch(createUser(newClientValues)).then(() => {
      return setClientModal(!clientModal);
    });
  };
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value as Roles;
    setNewClientValues((prevValues) => ({
      ...prevValues,
      role: newRole,
    }));
  };

  return (
    <DashboardLayout>
      <h1 className="h1">Clients</h1>
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
      <Box borderRadius={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <h2 className="h2">Clients List</h2>
          <Button
            variant="primary"
            onClick={() => setClientModal(!clientModal)}
          >
            New client
          </Button>
        </Box>
        <ListClients users={usersList} />
      </Box>

      {/* Modal */}
      <Modal
        isOpen={clientModal}
        onRequestClose={() => setClientModal(!clientModal)}
        className={`${clientStyle.ClientModal}`}
      >
        <h3 className="h3">Add new clients</h3>
        <form onSubmit={handleNewClientForm}>
          <Box display="flex" justifyContent="space-between">
            <FormControl
              sx={{ display: 'flex', flexDirection: 'column', marginY: '2rem' }}
            >
              <FormControl.Label>Email</FormControl.Label>
              <TextInput
                name="email"
                type="email"
                value={newClientValues.email}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewClientValues((prevState) => ({
                    ...prevState,
                    email: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl
              sx={{ display: 'flex', flexDirection: 'column', marginY: '2rem' }}
            >
              <FormControl.Label>First Name</FormControl.Label>
              <TextInput
                type="text"
                value={newClientValues.firstName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewClientValues((prevState) => ({
                    ...prevState,
                    firstName: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl
              sx={{ display: 'flex', flexDirection: 'column', marginY: '2rem' }}
            >
              <FormControl.Label>Last Name</FormControl.Label>
              <TextInput
                type="text"
                value={newClientValues.lastName}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewClientValues((prevState) => ({
                    ...prevState,
                    lastName: event.target.value,
                  }))
                }
              />
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <FormControl
              sx={{ display: 'flex', flexDirection: 'column', marginY: '2rem' }}
            >
              <FormControl.Label>Password</FormControl.Label>
              <TextInput
                name="password"
                type="password"
                value={newClientValues.password}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setNewClientValues((prevState) => ({
                    ...prevState,
                    password: event.target.value,
                  }))
                }
              />
            </FormControl>
            <FormControl
              sx={{ display: 'flex', flexDirection: 'column', marginY: '2rem' }}
            >
              <FormControl.Label>Role</FormControl.Label>
              <Select value={newClientValues.role} onChange={handleRoleChange}>
                {Object.values(Roles).map((role) => (
                  <Select.Option key={role} value={role}>
                    {role}
                  </Select.Option>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button variant="default" type="submit" className="m-auto">
            Create
          </Button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
