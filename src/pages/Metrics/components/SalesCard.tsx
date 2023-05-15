import React from 'react';
import {VStack, HStack, Box, Text, Image} from 'native-base';
import SalesCardSkeleton from './SalesCardSkeleton';

type SalesCardType = {
  maxValue: number;
  tittle: string;
  isLoading: boolean;
  data: {
    image?: string;
    name: string;
    value: number;
  }[];
};

const SalesCard = ({
  maxValue = 100,
  isLoading,
  tittle = 'Produtos mais vendidos:',
  data,
}: SalesCardType): JSX.Element => {
  return (
    <VStack
      paddingX={5}
      paddingY={5}
      borderColor={'#E4E4E4'}
      borderWidth={2}
      borderRadius={20}
      marginRight={4}>
      {isLoading ? (
        <SalesCardSkeleton />
      ) : (
        <>
          <Text marginBottom={5} fontSize={'lg'} bold>
            {tittle}
          </Text>
          {data.map(({image, value, name}, index) => {
            return (
              <HStack
                marginBottom={4}
                alignItems={'center'}
                justifyContent={'space-between'}
                w={400}
                key={index}>
                <Image
                  flexShrink={1}
                  size={60}
                  borderRadius={100}
                  source={
                    image
                      ? {
                          uri: image,
                        }
                      : require('../../../../assets/no-image.png')
                  }
                  alt="Failed in load image"
                />
                <VStack
                  justifyContent={'flex-start'}
                  paddingBottom={4}
                  marginLeft={2}
                  flex={1}
                  maxWidth={220}>
                  <Text fontSize={'md'} bold>
                    {name}
                  </Text>
                  <Box
                    w={`${(value / maxValue) * 100}%`}
                    maxWidth={220}
                    h={3}
                    borderRightRadius={20}
                    backgroundColor={'#04FF5A'}
                  />
                </VStack>
                <Text
                  bold
                  flexShrink={1}
                  fontSize={'lg'}
                  color={'#04FF5A'}
                  marginLeft={2}>{`${value}R$`}</Text>
              </HStack>
            );
          })}
        </>
      )}
    </VStack>
  );
};

export default SalesCard;
