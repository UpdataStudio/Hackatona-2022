import { Header, Footer, TabMenu } from '@/components/UI';
import { SEO } from '@/components';
import { Container } from '@mui/material';

const Structure = ({ children, config: { namePage, page } }: any) => {
    return (
        <>
            <SEO
                title={namePage}
                description={''}
                image={'/favicon.ico'} />
            <Header />
            <TabMenu selected={page}/>
            <Container maxWidth="xl" sx={{ minHeight: "calc(100vh - 128px)", padding: 5 }} >
                {children}
            </Container>
            <Footer />
        </>
    )
}

export default Structure;
