import React from 'react';
import {Box, Text, HStack, Image} from 'native-base';
import {Icon} from '../Icon';
import type {ProductInterface} from '../../types/ProductInterface';

const CardProduct = (
  product: Omit<
    ProductInterface,
    'createdAt' | 'id' | 'unitPrice' | 'description'
  >,
): JSX.Element => {
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
          source={{
            uri: product.image,
          }}
          alt="Alternate Text"
        />
        <Box ml={6}>
          <Text fontSize={'2xl'}>{product.name}</Text>
          <Text fontSize={'lg'}>{product.category}</Text>
        </Box>
      </Box>
      <Box flexDirection={'row'} alignItems={'center'}>
        <Icon name={'Minus'} strokeWidth={3} stroke="#000" />
        <Box
          marginX={2}
          padding={2}
          w={10}
          h={10}
          borderRadius={20}
          backgroundColor={'#D9D9D9'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Text>{product.stockQuantity}</Text>
        </Box>
        <Icon name={'Plus'} strokeWidth={3} stroke="#000" />
      </Box>
    </HStack>
  );
};

export default CardProduct;
