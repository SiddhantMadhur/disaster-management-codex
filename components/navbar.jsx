import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { supabase } from '../server/supabaseConfig';
import { useRouter } from 'next/router';


const drawerWidth = 250;

const loggedOutLinks = [
  {
    name: 'Sign In',
    href: '/auth/login',
    emoji: '👤'
  }
]

const accountLinks = [
  {
    name: 'Profile',
    href: '/auth/profile',
    emoji: '👤'
  },
  {
    name: 'Sign Out',
    href: '/auth/leave',
    emoji: '🛑'
  }
]

const links = [
  {
    name: 'Home',
    href: '/',
    emoji: '🏠'
  },
  {
    name: 'Guide',
    href: '/guide',
    emoji: '❓'
  },
  {
    name: 'Discussion',
    href: '/discussion',
    emoji: '👥'
  },
  {
    name: 'Donate / Volunteer',
    href: '/donate',
    emoji: '🆘'
  },
  {
    name: 'Citations',
    href: '/guide/citations',
    emoji: '📜'
  }
]

function NavCard(props) {
  return (
    <Link href={props.href} className='w-fit'>
      <button className='w-full' onClick={()=>{
        props.closeTab(false)
      }}>
        <a className='flex my-3 mx-4 gap-x-3  px-1 py-2 rounded-xl bg-gray-100 hover:translate-x-2 transition text-lg ' >
          <div className='text-2xl'>
            {props.emoji}
          </div>
          <div className='my-auto'>
            {props.name}
          </div>
        </a>
      </button>
    </Link>
  )
}





function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);


  const router = useRouter()
  supabase.auth.onAuthStateChange(() => {
    router.push('/')
  })


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const session = supabase.auth.session()
  const drawer = (
    <div>


      <List>
        {
          links.map((doc, key) => (
            <NavCard key={key} closeTab={setMobileOpen} emoji={doc.emoji} name={doc.name} href={doc.href} />
          ))
        }
      </List>

      <List className='absolute bottom-0 w-full'>
        {
          session ? (accountLinks.map((doc, key) => (
            <NavCard key={key} closeTab={setMobileOpen} emoji={doc.emoji} name={doc.name} href={doc.href} />
          ))) : (
            loggedOutLinks.map((doc, key) => (
              <NavCard key={key} closeTab={setMobileOpen} emoji={doc.emoji} name={doc.name} href={doc.href} />
            ))
          )
        }

      </List>

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;




  return (
    <Box sx={{ display: 'flex' }}>
      
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: 'blue' }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className='bg-[#fdf1e5]'>
          {props.children}
        </div>
      </Box>
    </Box>
  );
}
export default NavBar;