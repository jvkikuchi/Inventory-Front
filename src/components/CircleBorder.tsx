import React from 'react';
import { Box } from 'native-base';

const CircleBorder = (): JSX.Element => {
  return (
    <Box flex={1} position={'relative'}>
      <Box
        w={167}
        backgroundColor={'#FF9A3C'}
        h={167}
        borderBottomRightRadius={180}
        position={'absolute'}
      />
      <Box
        w={117}
        backgroundColor={'#3A4750'}
        h={117}
        borderBottomRightRadius={150}
        position={'absolute'}
      />
    </Box>
  );
};

export default CircleBorder;
