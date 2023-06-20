import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 72;
const HEADER_BACKGROUND_DESKTOP = "#fff";

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  position: "fixed",
  bottom: "0",
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
    background: HEADER_BACKGROUND_DESKTOP
  },
}));

// ----------------------------------------------------------------------

Footer.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Footer({ onOpenNav }) {

  return (
    <StyledRoot>
      <StyledToolbar>
        <Typography sx={{ color: "#000" }}>@ {new Date().getFullYear()}. All Right Reserved</Typography>
      </StyledToolbar>
    </StyledRoot>
  );
}
