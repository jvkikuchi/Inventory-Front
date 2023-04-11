import React from 'react';
import * as Icons from 'react-native-feather';

import {IconProps} from './index.types';

export const Icon: React.FC<IconProps> = ({
  name,
  height = 20,
  width = 20,
  fill = '#FFFF',
  stroke = '#A4A2A2',
  strokeWidth = 1,
}) => {
  const IconComponent = Icons[name];
  return (
    <IconComponent
      width={width}
      height={height}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};
