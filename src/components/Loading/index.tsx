import React from 'react';
import {Center, HStack, Skeleton} from 'native-base';

const Loading = ({count = 5}: {count?: number}): JSX.Element => {
  const skeleton = Array.from({length: count}, (_, index) => (
    <HStack
      marginBottom={10}
      key={index}
      w="100%"
      justifyContent={'space-between'}
      overflow="hidden"
      paddingX={5}
      rounded="md"
      _dark={{
        borderColor: 'coolGray.500',
      }}
      _light={{
        borderColor: 'coolGray.200',
      }}>
      <Skeleton h="60" w="60" borderRadius={100} />
      <Skeleton.Text paddingX={5} lines={3} px="12" />
    </HStack>
  ));
  return <Center w="100%"> {skeleton} </Center>;
};

export default Loading;
