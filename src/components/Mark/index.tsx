import React from 'react';
import {Text, HStack} from 'native-base';
import {Icon} from '../../components/Icon';
import type {IconNameType} from '../../components/Icon/index.types';

interface MarkInterface {
  name: string;
  background: string;
  border: string;
  iconName: IconNameType;
  iconStroke: string;
  iconFill: string;
}

const Mark = ({
  name,
  background,
  border,
  iconName,
  iconStroke,
  iconFill,
}: MarkInterface): JSX.Element => {
  return (
    <HStack
      marginY={0.5}
      padding={2}
      borderRadius={20}
      backgroundColor={background}
      borderWidth={1}
      borderColor={border}
      alignItems={'center'}
      minWidth={90}>
      <Icon
        name={iconName}
        strokeWidth={3}
        stroke={iconStroke}
        fill={iconFill}
      />
      <Text marginX={2}>{name}</Text>
    </HStack>
  );
};

export default Mark;
