import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    '&.MuiButton-containedPrimary': {
                        color: '#909090',
                        borderColor: '#909090'
                    },
                    '&.MuiButton-outlinedPrimary': {
                        color: '#909090',
                        borderColor: '#909090'
                    },
                    '&.MuiButton-textPrimary': {
                        color: '#909090',
                        borderColor: '#909090'
                    }
                }
            }
        }
    },
    palette: {
        primary: {
            main: '#6e3996'
        }
    }
});

export default theme;
