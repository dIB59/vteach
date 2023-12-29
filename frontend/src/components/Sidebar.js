import { Typography, Drawer, List, ListItemIcon, ListItemText, Avatar, ListItemButton  } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


const Sidebar = ({ teacherData }) => {

    const drawerWidth = 240;

    const DrawerContainer = styled(Drawer)({
        width: drawerWidth,
        flexShrink: 0,
    });
    
    const DrawerPaper = styled('div')({
        width: drawerWidth,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20px', // Adjust as needed
    });
    

    return (
        <DrawerContainer variant="permanent" anchor="left">
            <DrawerPaper>
                <Avatar sx={{ width: 80, height: 80, marginBottom: '10px' }}>
                    <AccountCircleIcon sx={{ width: 80, height: 80 }} />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                    {teacherData && `${teacherData.user.firstName} ${teacherData.user.lastName}`}
                </Typography>
                <List>
                    {//ListiteemButton should route to the correct page
                    }
                    <ListItemButton href='/homepage'>
                        <ListItemIcon>
                            <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Homepage" />
                    </ListItemButton >
                    <ListItemButton href='/session'>
                        <ListItemIcon>
                            <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sessions" />
                    </ListItemButton >
                    <ListItemButton href='/messaging'>
                        <ListItemIcon>
                            <MailOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Messaging" />
                    </ListItemButton >
                </List>
            </DrawerPaper>
        </DrawerContainer>
    );
};

export default Sidebar;
