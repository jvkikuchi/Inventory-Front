import * as Icons from 'react-native-feather';

export type IconNameType = keyof typeof Icons;

export interface IconProps {
  name: IconNameType;
  color?: string;
}
