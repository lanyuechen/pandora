import React from 'react';
import Navbar from '@/components/navbar';
import Container from '@/components/container';
import config from './index.config';

import './index.scss';

export default () => {
  return (
    <Container>
      <Navbar
        title={config.navigationBarTitleText}
      />
    </Container>
  )
}
