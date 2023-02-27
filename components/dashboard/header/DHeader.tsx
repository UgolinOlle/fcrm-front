import { Box, Header, Label } from '@primer/react';
import { useSelector } from 'react-redux';

import { selectUser } from '@/store/auth/selectors';
import { useState } from 'react';
import { BellIcon } from '@primer/octicons-react';
import { Roles } from '@/utils/enums/roles';

export const DHeader = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const popupHandler = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <Header
      sx={{
        minWidth: '85%',
        minHeight: '5.5rem',
        paddingX: '3rem',
        bg: ['white'],
        position: 'fixed',
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: 'border.default',
        borderStyle: 'solid',
      }}
    >
      <Header.Item
        sx={{
          fontSize: '1.5rem',
          color: 'black',
        }}
        full
      >
        {user?.firstName} {user?.lastName}
        <Label
          variant={
            user?.role === Roles.Prospect
              ? 'severe'
              : user?.role === Roles.Admin
              ? 'danger'
              : 'accent'
          }
          sx={{ marginLeft: '1rem' }}
        >
          {user?.role}
        </Label>
      </Header.Item>
      <Header.Item
        onClick={popupHandler}
        sx={{ color: 'black', cursor: 'pointer' }}
      >
        <BellIcon size={20} />
        <Box display={isOpen ? 'block' : 'none'}></Box>
      </Header.Item>
    </Header>
  );
};
