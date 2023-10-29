import Button from '@mui/material/Button';
import BasicInformationService from '../services/basic-information-service';
import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

function BasicInformationRightPanel() {
    const [contact, setContact] = useState<string>('');
    const [updatedContact, setUpdateContact] = useState<string>('');

    useEffect(() => {
        async function fetchData() {
            const contactText = await BasicInformationService.getContact();
            if (contactText) {
                setContact(contactText);
            }
        }

        fetchData();
    }, []);

    const sendUpdateContact = async () => {
        const response = await BasicInformationService.updateContact(contact);
        if (response) {
            setContact(response);
        }
    };

    return (
        <Box>
            <Paper>
                <Grid item xs={12}>
                    <Button onClick={sendUpdateContact}>test</Button>
                    <Typography variant="h5" align="right">
                        关于我们&nbsp;&nbsp;&nbsp;
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField id="outlined-basic" variant="standard"
                               value={contact}
                               InputProps={{
                                   readOnly: false,
                               }}
                               disabled={false}
                               fullWidth
                               multiline
                               rows={5}
                               onChange={(e) => {
                                   setContact(e.target.value);
                               }}
                    >
                    </TextField>
                </Grid>
            </Paper>
        </Box>
    );
}

export default BasicInformationRightPanel;
