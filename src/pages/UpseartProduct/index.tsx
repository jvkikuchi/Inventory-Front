import React, {useState} from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  VStack,
  ScrollView,
  Input,
  Pressable,
  Spinner,
  TextArea,
  Fab,
  Checkbox,
} from 'native-base';
import type {TabParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery, useMutation, useQueryClient} from 'react-query';
import {productsApi} from '../../utils/productsApi';
import {suppliersApi} from '../../utils/suppliersApi';
import {categoryApi} from '../../utils/categoryApi';
import Mark from '../../components/Mark';
import * as ImagePicker from 'expo-image-picker';
import {Icon} from '../../components/Icon';
import {Alert} from 'react-native';
import {useAuth} from '@clerk/clerk-expo';
import AWS from 'aws-sdk';
import {Buffer} from 'buffer';
import {SelectModal} from './compenents/SelectModal';

const UpseartProduct = ({
  navigation,
}: NativeStackScreenProps<TabParamsList, 'UpseartProduct'>): JSX.Element => {
  const {userId} = useAuth();

  const [price, setPrice] = useState('');
  const [count, setCount] = useState('');
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [supplier, setSupplier] = useState<{id?: string; name?: string}>({});
  const [category, setCategory] = useState<{id?: string; name?: string}>({});
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const [imageBase64, setImageBase64] = useState<string | undefined>();
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const markColor = '#FF9A3C';

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3({
    region: 'sa-east-1',
  });

  const uploadImageFromUrl = async (imageUrl: string) => {
    try {
      const fileName = `${name}.png`;

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: Buffer.from(imageUrl, 'base64'),
        ContentType: 'image/png',
        ACL: 'public-read',
      };

      const {Location} = await s3.upload(params).promise();
      console.log(`Image uploaded to S3: ${Location}`);

      return Location;
    } catch (error) {
      console.error(`Failed to upload image to S3: ${error}`);
    }
  };

  const {data, isLoading} = useQuery('get-categorys-suplliers', async () => {
    const [suppliersData, categoriesData] = await Promise.all([
      suppliersApi.list(),
      categoryApi.list(userId),
    ]);

    return {suppliers: suppliersData, categories: categoriesData};
  });

  const queryClient = useQueryClient();

  const {mutate, isLoading: isCreateLoading} = useMutation(
    (productBody: {
      userId: string;
      name: string;
      image?: string;
      stockQuantity: number;
      unitPrice: number;
      categoryId: number;
      description?: string;
      supplierId: number;
    }) =>
      productsApi.create({
        ...productBody,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('list-products');
        navigation.navigate('ListProducts');
      },
    },
  );

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImageBase64(result.assets[0].base64);
      setImagePreview(result.assets[0].uri);
    }
  };

  const submitItem = async () => {
    const productBody = {
      userId,
      name,
      image: null,
      stockQuantity: Number(count),
      unitPrice: Number(price),
      categoryId: Number(category.id),
      description,
      supplierId: Number(supplier.id),
    };

    const requiredInformation = {
      name: 'nome',
      stockQuantity: 'quantidade',
      unitPrice: 'preço',
      categoryId: 'categoria',
      supplierId: 'fornecedor',
    };

    const missingInformation = [];

    Object.entries(requiredInformation).forEach(([key, value]) => {
      //@ts-ignore I need read more about it!
      if (!productBody[key] || productBody[key] === '') {
        missingInformation.push(value);
      }
    });

    if (missingInformation.length) {
      Alert.alert(
        `Necessário preencher os seguintes campos: ${missingInformation.join(
          ', ',
        )}`,
      );

      return;
    }

    if (imagePreview) {
      productBody.image = await uploadImageFromUrl(imageBase64);
    }

    mutate(productBody);
  };

  return (
    <>
      {isLoading || isCreateLoading ? (
        <HStack
          space={2}
          justifyContent="center"
          alignItems={'center'}
          flex={1}
          backgroundColor={'#3A4750'}>
          <Spinner
            size="lg"
            color={'#FF9A3C'}
            accessibilityLabel="Carregando product"
          />
          <Heading color="#FF9A3C" fontSize="2xl">
            {isCreateLoading ? 'Criando produto' : 'Carregando'}
          </Heading>
        </HStack>
      ) : (
        <>
          <SelectModal
            showModal={showCategoriesModal}
            text="Selecione a categoria">
            {data.categories.map(c => {
              return (
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  key={c.id}
                  borderWidth={1}
                  paddingX={4}
                  width={'100%'}
                  paddingY={3}
                  marginBottom={2}
                  borderRadius={10}
                  borderColor={'#D9D9D9'}>
                  <Text fontSize={'lg'}>{c.name}</Text>
                  <Checkbox
                    onChange={() => {
                      setCategory({name: c.name, id: c.id});
                      setShowCategoriesModal(!showCategoriesModal);
                    }}
                    accessibilityLabel="Checkbox do fornecedor"
                    colorScheme="orange"
                    value={c.id}
                  />
                </HStack>
              );
            })}
          </SelectModal>
          <SelectModal
            showModal={showSupplierModal}
            text="Selecione o fornecedor">
            {data.suppliers.map(s => {
              return (
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  key={s.id}
                  borderWidth={1}
                  paddingX={4}
                  width={'100%'}
                  paddingY={3}
                  marginBottom={2}
                  borderRadius={10}
                  borderColor={'#D9D9D9'}>
                  <Text fontSize={'lg'}>{s.name}</Text>
                  <Checkbox
                    onChange={() => {
                      setSupplier({name: s.name, id: s.id});
                      setShowSupplierModal(!showSupplierModal);
                    }}
                    accessibilityLabel="Checkbox do fornecedor"
                    colorScheme="orange"
                    value={s.id}
                  />
                </HStack>
              );
            })}
          </SelectModal>
          <Box flex={1} backgroundColor={'#f6f6f6'}>
            <Box flex={1} backgroundColor={'#3A4750'}>
              <HStack
                w="100%"
                flexDirection={'row'}
                alignItems={'center'}
                safeArea
                borderColor={'#6D6D6D'}
                justifyContent={'center'}
                paddingTop={5}>
                <Input
                  color="#FFF"
                  fontSize={'2xl'}
                  placeholder="Nome do produto"
                  w="60%"
                  textAlign={'center'}
                  onChangeText={t => setName(t)}
                  value={name}
                />
              </HStack>
              <Box padding={5} alignItems={'center'} justifyContent={'center'}>
                <Pressable onPress={() => pickImage()}>
                  <Image
                    source={
                      imagePreview
                        ? {uri: imagePreview}
                        : require('../../../assets/no-image.png')
                    }
                    w={180}
                    h={180}
                    borderRadius={200}
                    alt="product-image"
                  />
                </Pressable>
              </Box>
              <Box
                w="100%"
                flexDirection={'row'}
                justifyContent={'space-around'}>
                <VStack alignItems={'center'}>
                  <Text marginBottom={3} fontSize={'2xl'} color={'#FFFFFF'}>
                    Quantidade
                  </Text>
                  <Input
                    onChangeText={t => setCount(t)}
                    minWidth={100}
                    textAlign={'center'}
                    fontSize={'2xl'}
                    color={'#FFF'}
                    inputMode="numeric"
                    placeholder="0"
                    value={count}
                  />
                </VStack>
                <VStack alignItems={'center'}>
                  <Text marginBottom={3} fontSize={'2xl'} color={'#FFFFFF'}>
                    Preço
                  </Text>
                  <Input
                    onChangeText={t => setPrice(t)}
                    minWidth={100}
                    textAlign={'center'}
                    fontSize={'2xl'}
                    color={'#FFF'}
                    placeholder="0"
                    inputMode="numeric"
                    value={price}
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
                  <TextArea
                    autoCompleteType={'text'}
                    numberOfLines={4}
                    minWidth={100}
                    color={'#000'}
                    textAlign={'left'}
                    justifyContent={'flex-start'}
                    placeholder="Descrição (opcional)"
                    onChangeText={t => setDescription(t)}
                    value={description}
                  />
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
                    {Object.keys(supplier).length > 0 ? (
                      <Pressable
                        onPress={() => {
                          setShowSupplierModal(!showSupplierModal);
                        }}>
                        <Mark
                          iconName={'User'}
                          iconStroke={'#303841'}
                          iconFill={markColor}
                          name={supplier.name!}
                          background={markColor}
                          border={markColor}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        padding={1}
                        borderRadius={20}
                        borderWidth={0.5}
                        borderColor={'#303841'}
                        onPress={() => {
                          setShowSupplierModal(!showSupplierModal);
                        }}>
                        <Icon name="Plus" stroke={'#303841'} fill={markColor} />
                      </Pressable>
                    )}
                  </HStack>
                </VStack>
                <VStack marginBottom={3}>
                  <Heading marginBottom={3} fontSize={20}>
                    Categorias
                  </Heading>
                  <HStack
                    flexWrap={'wrap'}
                    flexGrow={2}
                    flexDirection={'row'}
                    alignItems={'center'}
                    alignContent={'flex-start'}
                    paddingY={2}
                    space={3}>
                    {Object.keys(category).length > 0 ? (
                      <Pressable
                        onPress={() => {
                          setShowCategoriesModal(!showCategoriesModal);
                        }}>
                        <Mark
                          iconName={'User'}
                          iconStroke={'#303841'}
                          iconFill={markColor}
                          name={category.name!}
                          background={markColor}
                          border={markColor}
                        />
                      </Pressable>
                    ) : (
                      <Pressable
                        padding={1}
                        borderRadius={20}
                        borderWidth={0.5}
                        borderColor={'#303841'}
                        onPress={() => {
                          setShowCategoriesModal(!showCategoriesModal);
                        }}>
                        <Icon name="Plus" stroke={'#303841'} fill={markColor} />
                      </Pressable>
                    )}
                  </HStack>
                </VStack>
              </ScrollView>
            </Box>
            <Fab
              renderInPortal={false}
              shadow={2}
              size="lg"
              onPress={() => submitItem()}
              backgroundColor={markColor}
              icon={
                <Icon
                  name="Check"
                  stroke={'#fff'}
                  fill={markColor}
                  height={20}
                  width={20}
                  strokeWidth={4}
                />
              }
            />
          </Box>
        </>
      )}
    </>
  );
};
export default UpseartProduct;
