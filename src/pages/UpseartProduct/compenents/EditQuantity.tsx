import React from 'react';
import {Text, Input, HStack, Pressable} from 'native-base';

interface MarkInterface {
  value: number;
}

const EditQuantity = ({value}: MarkInterface): JSX.Element => {
  return (
    <HStack alignItems={'center'}>
      <Pressable>
        <Input />
      </Pressable>
      <Text marginX={5} fontSize={'4xl'} color={'#FFFFFF'}>
        {value}
      </Text>
      <Pressable>
        <Input />
      </Pressable>
    </HStack>
  );
};

export default EditQuantity;
