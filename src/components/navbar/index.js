import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Pages = [{
  "name": "CreateOt",
  "url": "/createOt"
},
{
  "name": "OT asignadas",
  "url": "/OtAsingPages"
},
{
  "name": "OT pendientes",
  "url": "/OtPendingPages"
},
{
  "name": "Todos los usuarios",
  "url": "/AllUser"
},
{
  "name": "Create Client",
  "url": "/createClient"
}
];

function ResponsiveAppBar() {
  const userNameLogin = useSelector(userLogin => userLogin.userLogin.name);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (url) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              letterSpacing: '.4rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Consultar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Pages.map((pageUrl, key) => (
                <MenuItem key={key} onClick={(e) => { handleCloseNavMenu(pageUrl.url) }}>
                  <Typography key={key} textAlign="center">{pageUrl.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Pages.map((pageUrl, key) => (
              <Button
                onClick={(e) => { handleCloseNavMenu(pageUrl.url) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pageUrl.name}
              </Button>
            ))}

            {/* <Button
              onClick={(e) => { handleCloseNavMenu("/createOt") }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"Create OT"}
            </Button>
            <Button
              onClick={(e) => { handleCloseNavMenu("/OtAsingPages") }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"OT asignadas"}
            </Button>
            <Button
              onClick={(e) => { handleCloseNavMenu("/OtPendingPages") }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"OT pendientes"}
            </Button>
            <Button
              onClick={(e) => { handleCloseNavMenu("/AllUser") }}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {"Todos los usuarios"}
            </Button> */}
          </Box>

          <Box sx={{ flexGrow: 0, width: "20%", display: "flex", alignItems: "center", justifyContent: "space-around", fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif', fontsize: "1.1rem" }}>
            {userNameLogin ? <p>{userNameLogin}</p> : <p>Iniciar Sesion</p>}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;