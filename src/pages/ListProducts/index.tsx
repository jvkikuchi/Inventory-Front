import React, {useState} from 'react';
import {Box, VStack, Text, Input, Pressable, Spinner} from 'native-base';
import type {TabParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icon} from '../../components/Icon';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {productsApi} from '../../utils/productsApi';
import CardProduct from '../../components/ProductCard';
import Loading from '../../components/Loading';
import Separator from '../../components/Separator';
import {ProductInterface} from '../../types/ProductInterface';
import {Fab} from 'native-base';
import {normalizeWord} from '../../utils/normalizeWord';
import {useAuth} from '@clerk/clerk-expo';

const ListProducts = ({
  navigation,
}: NativeStackScreenProps<TabParamsList, 'ListProducts'>): JSX.Element => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);

  const {userId} = useAuth();

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} =
    useInfiniteQuery(
      'list-products',
      async ({pageParam}) => {
        const response = await productsApi.list(userId, pageParam);

        return response;
      },
      {
        getNextPageParam: lastPage => {
          if (page < lastPage.totalPages) {
            return page;
          }

          return undefined;
        },
      },
    );

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage({pageParam: page});
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderSpinner = () => {
    return <Spinner color={'#FF9A3C'} size="lg" />;
  };

  const products: ProductInterface[] =
    data?.pages?.flatMap(p => p.products) ?? [];

  const renderProduct = ({item}: ListRenderItemInfo<ProductInterface>) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Product', {productId: item.id});
        }}>
        <CardProduct
          image={item.image}
          name={item.name}
          stockQuantity={item.stockQuantity}
        />
      </Pressable>
    );
  };

  return (
    <Box flex={1} safeArea>
      <VStack w="100%" backgroundColor={'#3A4750'}>
        <Text paddingY={6} paddingX={4} fontSize={'2xl'} color="#FFFFFF">
          Produtos
        </Text>
        <Input
          borderRadius={0}
          value={value}
          w="100%"
          onChangeText={text => {
            setValue(text);
          }}
          fontSize={'lg'}
          color={'#6D6D6D'}
          focusOutlineColor={'#D9D9D9'}
          backgroundColor={'#D9D9D9'}
          paddingX={5}
          placeholder="escreva o nome/codigo do produto"
          leftElement={
            <Box paddingLeft={2}>
              <Icon
                name={'Search'}
                width={25}
                height={25}
                strokeWidth={3}
                stroke="#5B5B5B"
                fill="#D9D9D9"
              />
            </Box>
          }
        />
      </VStack>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box flex={1} flexDirection={'column'}>
            <FlatList
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              keyExtractor={item => `${item.id}-${Math.random()}`}
              showsVerticalScrollIndicator={false}
              renderItem={renderProduct}
              data={products.filter(({name}) =>
                normalizeWord(name).includes(normalizeWord(value)),
              )}
              ItemSeparatorComponent={Separator}
              ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
            />

            <Fab
              backgroundColor={'#FF9A3C'}
              renderInPortal={false}
              shadow={2}
              size="sm"
              onPress={() => navigation.navigate('UpseartProduct')}
              icon={
                <Icon name="Plus" strokeWidth={3} stroke="#FFF" fill="#FFF" />
              }
            />
          </Box>
        </>
      )}
    </Box>
  );
};
export default ListProducts;
