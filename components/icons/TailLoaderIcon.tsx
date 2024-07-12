'use client';
import React from 'react';

const TailLoaderIcon = ({
  color = '#020617',
  size = '30',
}: {
  color?: string;
  size?: string;
}) => {
  React.useEffect(() => {
    async function getLoader() {
      const { tailChase } = await import('ldrs');
      tailChase.register();
    }
    getLoader();
  }, []);
  return <l-tail-chase color={color} size={size}></l-tail-chase>;
};

export default TailLoaderIcon;
