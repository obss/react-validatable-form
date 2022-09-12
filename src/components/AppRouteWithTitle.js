import { Helmet } from 'react-helmet-async';

const AppRouteWithTitle = ({ title, children }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

export default AppRouteWithTitle;
