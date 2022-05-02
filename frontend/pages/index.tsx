import Structure from '@/components/Structure';
import type { NextPage } from 'next';
import Router from 'next/router';
import React from 'react';

const Home: NextPage = () => {
  React.useEffect(() => {
    Router.push('/cims-df/dashboard');
  });
  return (
    <Structure config={{
      namePage: 'Home',
      page: 'home'
    }}/>
  )
}

export default Home
