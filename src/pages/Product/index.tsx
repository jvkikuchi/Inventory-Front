import React, {useState} from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
  ScrollView,
} from 'native-base';
import type {TabParamsList} from '../../types/rootStackParamListType';
import type {ProductInterface} from '../../types/ProductInterface';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {productsApi} from '../../utils/productsApi';
import Loading from '../../components/Loading';
import Mark from '../../components/Mark';
import QuantityButton from '../../components/QuantityButton';

const Product = ({
  route,
}: NativeStackScreenProps<TabParamsList, 'Product'>): JSX.Element => {
  const {productId} = route.params;

  const [price, setPrice] = useState(0);
  const [count, setCount] = useState(0);

  console.log(count, price);
  const {data, isLoading} = useQuery('get-product', async () => {
    const response: ProductInterface = await productsApi.get(productId);

    setPrice(response.unitPrice);
    setCount(response.stockQuantity);

    return response;
  });

  const queryClient = useQueryClient();

  const {mutate} = useMutation(
    () =>
      productsApi.update({
        id: productId,
        unitPrice: price.toString(),
        stockQuantity: count.toString(),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('list-products');
      },
    },
  );

  const markColor = '#FF9A3C';

  return (
    <Box flex={1} backgroundColor={'#f6f6f6'}>
      {isLoading ? (
        <Loading count={1} />
      ) : (
        <Box safeArea flex={1}>
          <Box flex={1} backgroundColor={'#3A4750'}>
            <HStack
              w="100%"
              flexDirection={'row'}
              alignItems={'center'}
              safeArea
              borderColor={'#6D6D6D'}
              justifyContent={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'} color={'#FFFFFF'}>
                {data.name}
              </Heading>
            </HStack>
            <Box padding={5} alignItems={'center'} justifyContent={'center'}>
              <Image
                w={200}
                h={200}
                borderRadius={200}
                source={{uri: data.image}}
                alt={productId}
              />
            </Box>
            <Box w="100%" flexDirection={'row'} justifyContent={'space-around'}>
              <VStack alignItems={'center'}>
                <Text marginBottom={3} fontSize={'2xl'} color={'#FFFFFF'}>
                  Quantidade
                </Text>
                <QuantityButton
                  value={count}
                  PlusOnPress={async () => {
                    await setCount(count + 1);
                    mutate();
                  }}
                  MinusOnPress={async () => {
                    await setCount(count - 1);
                    mutate();
                  }}
                />
              </VStack>
              <VStack alignItems={'center'}>
                <Text marginBottom={3} fontSize={'2xl'} color={'#FFFFFF'}>
                  Preço
                </Text>
                <QuantityButton
                  value={price}
                  PlusOnPress={async () => {
                    await setPrice(price + 1);
                    mutate();
                  }}
                  MinusOnPress={async () => {
                    await setPrice(price - 1);
                    mutate();
                  }}
                />
              </VStack>
            </Box>
          </Box>

          <Box flexDirection={'column'} padding={5} flex={0.8}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack marginBottom={3}>
                <Heading marginBottom={3} fontSize={23} bold>
                  Descrição
                </Heading>
                <Text>{data.description}</Text>
              </VStack>
              <VStack marginBottom={3}>
                <Heading marginBottom={3} fontSize={20}>
                  Produtor
                </Heading>
                <HStack
                  flexWrap={'wrap'}
                  flexGrow={2}
                  flexDirection={'row'}
                  alignItems={'center'}
                  alignContent={'flex-start'}
                  paddingY={2}
                  space={3}>
                  {[data.suppliers].map((c, index) => (
                    <Mark
                      iconName={'User'}
                      iconStroke={'#303841'}
                      iconFill={markColor}
                      name={c}
                      background={markColor}
                      border={markColor}
                      key={index}
                    />
                  ))}
                </HStack>
              </VStack>
              <VStack marginBottom={3}>
                <Heading marginBottom={3} fontSize={20}>
                  Categoria
                </Heading>
                <HStack
                  flexWrap={'wrap'}
                  flexGrow={2}
                  flexDirection={'row'}
                  alignItems={'center'}
                  alignContent={'flex-start'}
                  paddingY={2}
                  space={3}>
                  {[data.category].map((c, index) => (
                    <Mark
                      iconName={'Bookmark'}
                      iconStroke={'#303841'}
                      iconFill={markColor}
                      name={c}
                      background={markColor}
                      border={markColor}
                      key={index}
                    />
                  ))}
                </HStack>
              </VStack>
            </ScrollView>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Product;
