import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import deleteLogin from '../../hooks/deleteLogin';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useEffect } from 'react';
import getDataFromUrl from '../../hooks/getDataFromUrl';
import { useState } from 'react';
import getUser from '../../hooks/getUser';
import typesUsers from '../../classes/typesUsers';
import getIp from '../../hooks/getIp';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar() {
  const [Config, setConfig] = useState()
  useEffect(() => {
    const getConfig = async () => {
      const responseConfig = await getDataFromUrl('/getConfig')
      if (responseConfig) {
        setConfig(responseConfig)
        fetch(`${getIp()}:4000/getBrowserLogo`)
          .then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            changeFavicon(url);
          });
      }
    }
    getConfig()
  }, [])
  let Pages = [];
  let user;
  let userNameLogin;
  let roles
  try {
    user = getUser();
    roles = getUser("roles")
    switch (roles) {
      case typesUsers.Trabajador:
        Pages = linkTrabajador
        break;
      case typesUsers.Admin:
        Pages = linkAdmin
        break;
      case typesUsers.Director:
        Pages = linkDirector
        break;
      case typesUsers.AdminSystem:
        Pages = linkAdminSystem
        break;

      default:
        break;
    }
    userNameLogin = user ? user.name : "";
  } catch (error) {
    console.log(error)
  }
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = (url) => {
    setAnchorElNav(null);
    navigate(url);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseAccount = () => {
    deleteLogin()
    window.location.reload()
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            {Config ? Config : "Cargando"}
          </Typography>
          {Config && <img src={`${getIp()}:4000/getCompanyLogo`}
            alt='company logo' style={{ height: "2%", width: "5%" }} />}

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
                key={key}
                onClick={(e) => { handleCloseNavMenu(pageUrl.url) }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pageUrl.name}
              </Button>
            ))}

          </Box>

          <Box sx={{ flexGrow: 0, width: "20%", display: "flex", alignItems: "center", justifyContent: "space-around", fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif', fontsize: "1.1rem" }}>
            {userNameLogin ? <p>{userNameLogin}</p> : <Box onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>Iniciar Sesion</Box>}
            {userNameLogin && <p style={{ cursor: 'pointer' }} onClick={handleCloseAccount}>Cerrar Sesion</p>}
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip> */}
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
const linkTrabajador = [
  {
    "name": "Tareas asignadas",
    "url": "/OtAsingPages"
  }]

const linkAdmin = [
  {
    "name": "Lista OT",
    "url": "/OtList"
  },
  {
    "name": "Nueva Factura",
    "url": "/createFact"
  },
  {
    "name": "Nueva OT",
    "url": "/createOt"
  },
  {
    "name": "Clientes",
    "url": "/listClients"
  },
]
const linkDirector = [
  {
    "name": "Lista OT",
    "url": "/OtList"
  },
  {
    "name": "Clientes",
    "url": "/listClients"
  },
  {
    "name": "Nueva Factura",
    "url": "/createFact"
  },
  {
    "name": "Nueva OT",
    "url": "/createOt"
  },
]
const linkAdminSystem = [{
  "name": "Usuarios",
  "url": "/AllUser"
},
{
  "name": "Config",
  "url": "/configuración"
}]
// const linkAdmin = [
//   {
//     "name": "Lista OT",
//     "url": "/OtList"
//   },
//   {
//     "name": "Tareas asignadas",
//     "url": "/OtAsingPages"
//   },
//   {
//     "name": "Crear OT",
//     "url": "/createOt"
//   },
//   {
//     "name": "Crear FACT",
//     "url": "/createFact"
//   },
//   {
//     "name": "Clientes",
//     "url": "/listClients"
//   },
//   {
//     "name": "Usuarios",
//     "url": "/AllUser"
//   },
//   {
//     "name": "Estadisticas",
//     "url": "/estadisticas"
//   },
//   {
//     "name": "Config",
//     "url": "/configuración"
//   }]
const changeFavicon = (url) => {
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = url;
};

export default ResponsiveAppBar;