import React from 'react';
import {
  Layout,
  NotFound as NotFoundLogo,
} from '@components';
import { useStyles } from './styles';

function NotFound() {
  const classes = useStyles();
  return (
    <Layout className={classes.root}>
      <NotFoundLogo />
    </Layout>
  );
}

export default NotFound;
