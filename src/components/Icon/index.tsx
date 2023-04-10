import React from 'react';
import * as Icons from 'react-native-feather';

import {IconProps} from './index.types';

export const Icon: React.FC<IconProps> = ({name}) => {
  const IconComponent = Icons[name];
  return (
    <IconComponent
      width={20}
      height={20}
      fill="#EDEDED"
      stroke="#000000"
      strokeWidth={1}
    />
  );
};

export default Icon;
