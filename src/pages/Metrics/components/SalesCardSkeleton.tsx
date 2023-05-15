import React from 'react';
import {VStack, HStack, Skeleton} from 'native-base';

const SalesCardSkeleton = (): JSX.Element => {
  return (
    <>
      {[1, 2, 3].map((_, index) => {
        return (
          <HStack
            key={index}
            marginBottom={4}
            alignItems={'center'}
            justifyContent={'space-between'}
            w={400}>
            <Skeleton
              startColor={'gray.100'}
              endColor={'gray.300'}
              height={60}
              width={60}
              borderRadius={100}
            />
            <VStack
              justifyContent={'flex-start'}
              paddingBottom={4}
              marginLeft={2}
              flex={1}
              maxWidth={220}>
              <Skeleton
                startColor={'gray.100'}
                endColor={'gray.300'}
                height={5}
                marginBottom={2}
                width={'20%'}
              />
              <Skeleton
                startColor={'gray.100'}
                endColor={'gray.300'}
                height={5}
                width={'80%'}
                marginBottom={2}
              />
            </VStack>
            <Skeleton
              startColor={'gray.100'}
              endColor={'gray.300'}
              height={5}
              width={'20%'}
              marginLeft={2}
            />
          </HStack>
        );
      })}
    </>
  );
};

export default SalesCardSkeleton;
