import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import { Button } from '@mui/material';
import PaymentService from 'services/payment-service';

const Agency = (): JSX.Element => {
  const [paymentLink, setPaymentLink] = useState<string>('');
  


  useEffect(() => {
    const jarallaxInit = async () => {
      const jarallaxElems = document.querySelectorAll('.jarallax');
      if (!jarallaxElems || (jarallaxElems && jarallaxElems.length === 0)) {
        return;
      }

      const { jarallax } = await import('jarallax');
      jarallax(jarallaxElems, { speed: 0.2 });
    };

    async function fetchData() {
      const paymentLink = await PaymentService.getPaymentLink();
      console.log(paymentLink);
      if (paymentLink) {
          setPaymentLink(paymentLink);
      }
    }

    fetchData();
    jarallaxInit();
  }, []);

  const theme = useTheme();


  return (
    <Main>
      <Box
        minHeight={'100vh'}
        display={'flex'}
        alignItems={'center'}
        bgcolor={'alternate.main'}
        marginTop={-13}
        paddingTop={13}
      >
        <Container>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Button
              sx={{ height: 54, minWidth: 100, whiteSpace: 'nowrap' }}
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              //get the payment link from backend
              onClick={() => window.location.href = paymentLink}
              //onClick={() => window.location.href = 'https://buy.stripe.com/test_cN25ol0Pjc3fePe4gh'}
            >
              Support
          </Button>
          {/* <Welcome /> */}

          </Box>
        </Container>
      </Box>

    </Main>
  );
};

export default Agency;
