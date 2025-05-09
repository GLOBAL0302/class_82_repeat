import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { IUser } from '../../../types';
import { useAppDispatch } from '../../../store/hooks';
import { logOutThunk } from '../../Users/usersThunks';

interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [usersMenu, setUsersMenu] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setUsersMenu(event.currentTarget);
  };

  const handleClose = () => {
    setUsersMenu(null);
  };
  return (
    <div>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu keepMounted anchorEl={usersMenu} open={Boolean(usersMenu)} onClose={handleClose}>
        <MenuItem>
          <Button component={NavLink} to="/products/new" onClick={handleClose}>
            Add product
          </Button>
        </MenuItem>
        <MenuItem onClick={() => navigate('/trackHistory')}>My History</MenuItem>
        <MenuItem onClick={() => dispatch(logOutThunk())}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
