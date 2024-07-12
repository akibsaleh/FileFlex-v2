import HeaderNav from '@/components/HeaderNav';
import LogoIcon from '@/components/icons/LogoIcon';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const Header = ({
  color = 'transparent',
  elevation = 1,
}: {
  color?:
    | 'primary'
    | 'secondary'
    | 'transparent'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  elevation?: number;
}) => {
  return (
    <AppBar position='static' color={color} elevation={0}>
      <Toolbar disableGutters sx={{ width: '100%' }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
          px={2}
        >
          <IconButton LinkComponent={Link} href='/'>
            <LogoIcon color={color === 'primary' ? '#f5f5f5' : '#0b3c5d'} />
            <Typography
              component='h2'
              color={color === 'primary' ? 'text.secondary' : 'primary'}
              style={{
                fontWeight: '900',
                fontSize: '18px',
                letterSpacing: '1px',
                marginLeft: '4px',
              }}
            >
              FILEFLEX
            </Typography>
          </IconButton>
          <HeaderNav color={color} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
