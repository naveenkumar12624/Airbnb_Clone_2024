

// import React from 'react';
// import { Avatar, Menu, MenuItem } from '@mui/material';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import { useHistory } from 'react-router-dom';

// function ProfileMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const history = useHistory();

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNavigate = (route) => {
//     history.push(route);
//     handleClose();
//   };

//   return (
//     <div>
//       <div onClick={handleClick} style={{ cursor: 'pointer' }}>
//         <MenuRoundedIcon />
//         <Avatar />
//       </div>
//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MenuItem onClick={() => handleNavigate('/signup')}>Signup</MenuItem>
//         <MenuItem onClick={() => handleNavigate('/login')}>Login</MenuItem>
//         <MenuItem onClick={() => handleNavigate('/airbnb-home')}>Airbnb Your Home</MenuItem>
//         <MenuItem onClick={() => handleNavigate('/host-experience')}>Host an experience</MenuItem>
//         <MenuItem onClick={() => handleNavigate('/help')}>Help</MenuItem>
//       </Menu>
//     </div>
//   );
// }

// export default ProfileMenu;


// import React from 'react';
// import { Link } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import { Avatar } from '@material-ui/core';
// import './header_styles.css';

// const ProfileMenu = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <div
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//         className="profile-menu-flex"
//       >
//         <MenuRoundedIcon />
//         <Avatar />
//       </div>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//         sx={{
//           '.MuiPaper-root': {
//             minWidth: '200px',
//             borderRadius: '1rem',
//             boxShadow:
//               '0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)',
//           },
//         }}
//       >
//         <MenuItem className="menu-items" onClick={handleClose}>
//           <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
//             Login
//           </Link>
//         </MenuItem>
//         <MenuItem onClick={handleClose} className="menu-items">
//           <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//             Home
//           </Link>
//         </MenuItem>
//         <div
//           style={{
//             height: '1px',
//             backgroundColor: 'var(--grey)',
//             width: '100%',
//           }}
//         />
//         <MenuItem onClick={handleClose} className="menu-items">
//           Airbnb Your Home
//         </MenuItem>
//         <MenuItem onClick={handleClose} className="menu-items">
//           Host an experience
//         </MenuItem>
//         <MenuItem onClick={handleClose} className="menu-items">
//           Help
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// };

// export default ProfileMenu;


import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Avatar } from '@material-ui/core';
import './header_styles.css';

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="profile-menu-flex"
      >
        <MenuRoundedIcon />
        <Avatar />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '.MuiPaper-root': {
            minWidth: '200px',
            borderRadius: '1rem',
            boxShadow:
              '0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)',
          },
        }}
      >
        <MenuItem onClick={handleClose} className="menu-items">
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            Login
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </MenuItem>
        <div
          style={{
            height: '1px',
            backgroundColor: 'var(--grey)',
            width: '100%',
          }}
        />
        <MenuItem onClick={handleClose} className="menu-items">
          Airbnb Your Home
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Host an experience
        </MenuItem>
        <MenuItem onClick={handleClose} className="menu-items">
          Help
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;

