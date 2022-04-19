import { Drawer } from '@mui/material';
import { NavSidebar } from './NavSidebar';

const MainDrawer = ({ open, toggleDrawer }) => {
    return (
        <Drawer
            ModalProps={{
                keepMounted: true,
            }}
            anchor={'left'}
            open={open}
            onClose={() => toggleDrawer(false)}
        >
            <NavSidebar toggleDrawer={toggleDrawer} />
        </Drawer>
    );
};

export default MainDrawer;
