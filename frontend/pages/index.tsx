import Structure from '@/components/Structure';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Structure config={{
      namePage: 'Home',
      page: 'home'
    }}/>
  )
}

export default Home
