import React, {useState, useCallback} from 'react';
import {Box, VStack, Text, Input, Modal, HStack, Pressable} from 'native-base';
import type {TabParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Icon} from '../../components/Icon';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useQuery} from 'react-query';
import {productsApi} from '../../utils/productsApi';
import CardProduct from '../../components/ProductCard';
import Loading from '../../components/Loading';
import {categoryApi} from '../../utils/categoryApi';
import Separator from '../../components/Separator';
import {ProductInterface} from '../../types/ProductInterface';
import {Fab} from 'native-base';

const ListProducts = ({
  navigation,
}: NativeStackScreenProps<TabParamsList, 'ListProducts'>): JSX.Element => {
  const [value, setValue] = useState('');
  const [filters, setFilter] = useState<Record<string, boolean>>({});
  const [tagFilter, setTagFilter] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);

  const {data, isLoading} = useQuery(['list-products', filters], async () => {
    const [products, categories] = await Promise.all([
      productsApi.list(filters),
      categoryApi.list(),
    ]);

    return {products, categories};
  });

  const renderProduct = ({item}: ListRenderItemInfo<ProductInterface>) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('Product', {productId: item.id})}>
        <CardProduct
          category={item.category}
          image={item.image}
          name={item.name}
          stockQuantity={item.stockQuantity}
        />
      </Pressable>
    );
  };

  const handleTagFilter = useCallback(
    tagName => {
      setTagFilter(prevTagFilter => {
        return {...prevTagFilter, [tagName]: !prevTagFilter[tagName]};
      });
    },
    [setTagFilter],
  );

  const renderTags = tags => {
    return (
      <HStack
        flexWrap={'wrap'}
        flexGrow={2}
        flexDirection={'row'}
        alignItems={'center'}
        alignContent={'flex-start'}
        paddingY={2}
        space={3}>
        {tags.map(tag => {
          const active = {
            border: '#FF9A3C',
            background: '#FF9A3C',
          };
          const inactive = {
            border: '#AEAEAE',
            background: '#FFF',
          };
          const colors = tagFilter[tag.name] ? active : inactive;
          return (
            <Pressable onPress={() => handleTagFilter(tag.name)} key={tag.id}>
              <HStack
                marginY={0.5}
                padding={2}
                borderRadius={20}
                backgroundColor={colors.background}
                borderWidth={1}
                borderColor={colors.border}
                alignItems={'center'}>
                <Text>{tag.name}</Text>
              </HStack>
            </Pressable>
          );
        })}
      </HStack>
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
          rightElement={
            <Pressable onPress={() => setShowModal(true)}>
              <Box paddingRight={2}>
                <Icon name={'Filter'} width={30} height={30} fill="#5B5B5B" />
              </Box>
            </Pressable>
          }
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
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size={'full'}>
            <Modal.Content
              padding={5}
              borderTopRadius={60}
              marginBottom={0}
              marginTop={'auto'}>
              <Modal.CloseButton />

              <Modal.Header>Filtros</Modal.Header>
              <Modal.Body>
                <Box>
                  <Text bold fontSize={'md'}>
                    Categorias de produto:
                  </Text>
                  {renderTags(data.categories)}
                </Box>
                <Box />
              </Modal.Body>
            </Modal.Content>
          </Modal>
          <Box flex={1} flexDirection={'column'}>
            <FlatList
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={renderProduct}
              data={data.products.slice(0, 10)}
              ItemSeparatorComponent={Separator}
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
