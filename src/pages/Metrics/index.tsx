import React, {useState} from 'react';
import {Box, Text, HStack, VStack, ScrollView} from 'native-base';
import type {TabParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from 'react-query';
import PaymentMethodMetrics from './components/PaymentMethodMetrics';
import SalesCard from './components/SalesCard';
import {statisticsApi} from '../../utils/statisticsApi';
import {useAuth} from '@clerk/clerk-expo';

const Metrics = ({}: NativeStackScreenProps<
  TabParamsList,
  'Metrics'
>): JSX.Element => {
  const {userId} = useAuth();

  const [productsStatistics, setProductsStatistics] = useState([]);
  const [suppliersStatistics, setSuppliersStatistics] = useState([]);
  const [maxProductsPrice, setMaxProductsPrice] = useState<number>(0);
  const [maxSuppliersPrice, setMaxSuppliersPrice] = useState<number>(0);

  const {isLoading} = useQuery('get-statistics', async () => {
    const response = await statisticsApi.get(userId);

    const {productsSalesHistory, productsAmountPrice} =
      response.productsFinancialStatistics.reduce(
        (acc, cr) => {
          const {salesHistory, image, name} = cr;
          let sumSales = 0;

          for (const sale of salesHistory) {
            sumSales += sale.totalPrice;
          }

          acc.productsSalesHistory.push({
            salesHistory,
            image,
            name,
            value: sumSales,
          });

          acc.productsAmountPrice.push(sumSales);
          return acc;
        },
        {productsSalesHistory: [], productsAmountPrice: []},
      );

    setProductsStatistics(productsSalesHistory);
    setMaxProductsPrice(Math.max(...productsAmountPrice));

    const {suppliersSalesHistory, suppliersAmountPrice} =
      response.suppliersFinancialStatistics.reduce(
        (acc, cr) => {
          const {salesHistory, name} = cr;
          let sumSales = 0;

          for (const sale of salesHistory) {
            sumSales += sale.totalPrice;
          }

          acc.suppliersSalesHistory.push({
            salesHistory,
            name,
            image: 'https://www.w3schools.com/w3images/avatar2.png',
            value: sumSales,
          });

          acc.suppliersAmountPrice.push(sumSales);
          return acc;
        },
        {suppliersSalesHistory: [], suppliersAmountPrice: []},
      );

    setSuppliersStatistics(suppliersSalesHistory);
    setMaxSuppliersPrice(Math.max(...suppliersAmountPrice));

    return response;
  });

  return (
    <Box backgroundColor={'#FFF'} flex={1} safeArea>
      <ScrollView>
        <VStack w="100%" backgroundColor={'#3A4750'}>
          <Text paddingY={6} paddingX={4} fontSize={'2xl'} color="#FFFFFF">
            Estáticas
          </Text>
        </VStack>
        <PaymentMethodMetrics />
        <ScrollView
          paddingX={4}
          marginTop={4}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <HStack space={2}>
            <SalesCard
              isLoading={isLoading}
              data={productsStatistics}
              maxValue={maxProductsPrice}
              tittle="Produtos mais vendido:"
            />
            <SalesCard
              isLoading={isLoading}
              data={suppliersStatistics}
              maxValue={maxSuppliersPrice}
              tittle="Fornecedores que mais venderam:"
            />
          </HStack>
        </ScrollView>
        <Box width={'100%'} paddingX={5} marginY={8}>
          <Box alignItems={'center'} width={'100%'} backgroundColor={'#3A4750'}>
            <Text fontSize={'2xl'} color={'#fff'}>
              Métricas Produto
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Metrics;
