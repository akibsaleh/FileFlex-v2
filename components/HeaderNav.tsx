import { Dashboard, GitHub, Login } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { auth } from '../auth';
import UserMenu from '././auth/UserMenu';
import LogoutButton from './auth/LogoutButton';

const HeaderNav = async ({
  color,
}: {
  color?:
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}) => {
  const session = await auth();
  const user = session?.user ?? null;
  return (
    <Box display='flex' alignItems='center' gap={1.5}>
      {!user && (
        <Button
          LinkComponent={Link}
          href='https://github.com/akibsaleh/FileFlex'
          color='primary'
          size='medium'
          variant='text'
        >
          <GitHub fontSize='small' />
          <Typography
            ml={1}
            fontSize={16}
            fontWeight={500}
            textTransform='capitalize'
          >
            Source Code
          </Typography>
        </Button>
      )}

      {!user && (
        <Button
          LinkComponent={Link}
          href='/auth/login'
          color='primary'
          size='medium'
          variant='outlined'
        >
          <Login fontSize='small' />
          <Typography
            ml={1}
            fontSize={16}
            fontWeight={500}
            textTransform='capitalize'
          >
            Get Access
          </Typography>
        </Button>
      )}
      {user && (
        <Button
          LinkComponent={Link}
          href='/dashboard'
          color='inherit'
          size='medium'
          variant='text'
        >
          <Dashboard fontSize='small' />
          <Typography
            ml={1}
            fontSize={16}
            fontWeight={500}
            textTransform='capitalize'
          >
            Dashboard
          </Typography>
        </Button>
      )}
      {user && (
        <UserMenu
          name={user && user.name ? user.name : undefined}
          image={user && user.image ? user.image : undefined}
          color={color === 'primary' ? 'primary' : 'transparent'}
        />
      )}
      {user && (
        <LogoutButton color={color === 'primary' ? 'primary' : 'transparent'} />
      )}

      {/* <IconButton
        size='large'
        aria-label='sample menu'
        aria-controls='menu-appBar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='menu-appBar'
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseNavMenu}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.text}
            LinkComponent={Link}
            href={item.href}
            onClick={handleCloseNavMenu}
          >
            <Typography textAlign='center'>{item.text}</Typography>
          </MenuItem>
        ))}
      </Menu> */}
    </Box>
  );
};

export default HeaderNav;
