import React from 'react';
import {Box, Text} from 'native-base';
import type {StackParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const Products = ({
  navigation,
}: NativeStackScreenProps<StackParamsList, 'Login'>): JSX.Element => {
  return (
    <Box safeArea justifyContent={'center'}>
      <Text> Pedro </Text>
    </Box>
  );
};

export default Products;
