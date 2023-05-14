import React from 'react';
import {Box, Text, HStack, Image} from 'native-base';
import {capitalizeFirstLetter} from '../../utils/capitalizeFirstLetter';

const CardProduct = ({
  image,
  name,
  stockQuantity,
}: {
  image?: string;
  name: string;
  stockQuantity: number;
}): JSX.Element => {
  return (
    <HStack w="100%" paddingX={5} justifyContent={'space-between'}>
      <Box
        maxWidth={280}
        flexDirection={'row'}
        paddingY={5}
        alignItems={'center'}>
        <Image
          size={60}
          borderRadius={100}
          source={
            image
              ? {
                  uri: image,
                }
              : require('../../../assets/no-image.png')
          }
          alt="Alternate Text"
        />
        <Box ml={6} flexWrap={'wrap'}>
          <Text w={'90%'} fontSize={'lg'}>
            {capitalizeFirstLetter(name)}
          </Text>
        </Box>
      </Box>
      <Box flexDirection={'row'} alignItems={'center'}>
        <Box
          marginX={2}
          padding={2}
          w={10}
          h={10}
          borderRadius={20}
          backgroundColor={'#D9D9D9'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text>{stockQuantity}</Text>
        </Box>
      </Box>
    </HStack>
  );
};

export default CardProduct;
