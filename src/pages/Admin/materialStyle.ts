import { createMuiTheme, makeStyles } from '@material-ui/core/styles';

import media from '@styles/media';

export let theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      mobile: 480,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  palette: {
    primary: {
      light: '#AE9EFF',
      main: '#5d3fe8',
      dark: '#252c44',
      background: '#F6F3FD',
    },
  },
  typography: {
    fontSize: 14,
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        position: 'absolute',
        backgroundColor: theme.palette.primary.background,
      },
    },
    MuiTypography: {
      body2: {
        fontSize: '1.3rem',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '1.3rem',
      },
    },
    MuiOutlinedInput: {
      inputMultiline: {
        lineHeight: '20px',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '1.2rem',
      },
    },
  },
};

export const useStyles = makeStyles({
  root: {
    width: media.laptop,
    margin: '0 auto',
    display: 'flex',
    minHeight: '100vh',
    position: 'relative',
  },
  drawer: {
    width: '256px',
    flexShrink: 0,
    zIndex: 1,
  },
  app: {
    width: '80%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#FAFAFA',
  },
  paper: {
    width: '256px',
    zIndex: 1,
  },
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.black,
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    color: theme.palette.common.black,
    '&:hover,&:focus': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
  },
  itemCategory: {
    backgroundColor: theme.palette.primary.background,
    boxShadow: '0 -1px 0 #cccccc inset',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  firebase: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
  itemActiveItem: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  itemPrimary: {
    fontSize: 13,
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  smallMenu: {
    height: '50px',
    paddingLeft: '65px',
  },
  smallItem: {
    height: '50px',
    paddingLeft: '65px',
  },
  activeItem: {
    background: '#EAE3FF',
  },
  MuiTypography: {
    root: {
      fontSize: '16px',
    },
  },
});
