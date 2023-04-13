import React from 'react';
import {Box, Icon, Text, Switch, HStack} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';

interface TagFilterProps {
  name: string;
  icon: string;
  onToggle: () => boolean;
  isChecked: boolean;
}

const TagFilter = ({
  name,
  icon,
  isChecked,
  onToggle,
}: TagFilterProps): JSX.Element => {
  return (
    <HStack>
      <Box flex={1} flexDirection={'row'} alignItems={'center'}>
        <Icon as={Feather} size={5} name={icon} color={'#b8b0b0'} />
        <Text marginLeft={3} fontSize="lg">
          {name}
        </Text>
      </Box>
      <Switch onToggle={onToggle} isChecked={isChecked} size="md" />
    </HStack>
  );
};

export default TagFilter;
