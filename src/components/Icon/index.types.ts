import * as Icons from 'react-native-feather';

export type IconNameType = keyof typeof Icons;

export interface IconProps {
  /**
   * IconName according to the react-feather library
   **/
  name: IconNameType;
  /**
   * A color name
   **/
  color?: string;
}
