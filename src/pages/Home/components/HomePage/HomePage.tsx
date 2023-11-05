import React from 'react';
import {useTheme} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import BasicInformationRightPanel from '../../../../components/BasicInformationRightPanel';

const HomePage = (): JSX.Element => {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            <Grid item xs={8} sx={{border: 1, height: 500}}>
                main content
            </Grid>
            <Grid item xs={4} sx={{border: 1, height: 500}}>
                <BasicInformationRightPanel></BasicInformationRightPanel>
            </Grid>
        </Grid>
    );
};

export default HomePage;
