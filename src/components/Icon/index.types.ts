import * as Icons from 'react-native-feather';

export type IconNameType = keyof typeof Icons;

export interface IconProps {
  name: IconNameType;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
}
