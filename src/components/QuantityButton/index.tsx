import React from 'react';
import {Text, HStack, Pressable} from 'native-base';
import {Icon} from '../Icon';

type GenericFunction =
  | ((...args: any[]) => Promise<any>)
  | ((...args: any[]) => any);

interface MarkInterface {
  value: number;
  MinusOnPress: GenericFunction;
  PlusOnPress: GenericFunction;
}

const QuantityButton = ({
  value,
  PlusOnPress,
  MinusOnPress,
}: MarkInterface): JSX.Element => {
  return (
    <HStack alignItems={'center'}>
      <Pressable onPress={MinusOnPress}>
        <Icon name={'Minus'} strokeWidth={3} stroke="#FFFFFF" />
      </Pressable>
      <Text marginX={5} fontSize={'4xl'} color={'#FFFFFF'}>
        {value}
      </Text>
      <Pressable onPress={PlusOnPress}>
        <Icon name={'Plus'} strokeWidth={3} stroke="#FFFFFF" />
      </Pressable>
    </HStack>
  );
};

export default QuantityButton;
