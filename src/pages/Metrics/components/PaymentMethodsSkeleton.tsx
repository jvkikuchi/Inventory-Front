import React from 'react';
import {VStack, Box, Text, HStack, Skeleton} from 'native-base';

const PaymentMethodsSkeleton = () => {
  return (
    <VStack>
      <Box w={'100%'}>
        <Text fontSize={'2xl'} textAlign={'center'} bold>
          <Skeleton w={'70%'} h={30} />
        </Text>
      </Box>
      <HStack w={'100%'} justifyContent={'space-around'}>
        <Skeleton borderRadius={1200} w={'50%'} h={200} />
        <VStack>
          {[1, 2, 3].map((_, index) => {
            return (
              <HStack marginY={2} key={index}>
                <Box marginRight={5} w={5} borderRadius={20}>
                  <Skeleton w={5} h={5} borderRadius={20} />
                </Box>
                <Box marginRight={5} w={50}>
                  <Skeleton w={50} h={5} />
                </Box>
              </HStack>
            );
          })}
          <Text marginTop={6} fontSize={'lg'} bold>
            <Skeleton w={'30%'} h={20} />
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default PaymentMethodsSkeleton;
