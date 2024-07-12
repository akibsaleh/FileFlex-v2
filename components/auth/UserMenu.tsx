'use client';
import avatar from '@/public/avatar.png';
import { Avatar, Chip } from '@mui/material';
import React from 'react';

const UserMenu = ({
  name,
  image,
  color,
}: {
  name?: string;
  image?: string;
  color: 'primary' | 'transparent';
}) => {
  const [anchorEl, setAnchorEl] = React.useState<
    (EventTarget & Element) | null
  >(null);

  const handleMenuOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Chip
      label={name ? name : 'user'}
      variant='outlined'
      size='medium'
      color={color === 'transparent' ? 'primary' : 'secondary'}
      sx={{ textTransform: 'capitalize !important' }}
      avatar={<Avatar alt={name || ''} src={image ? image : avatar.src} />}
    />
  );
};

export default UserMenu;
