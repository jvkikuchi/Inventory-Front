import React, {useState} from 'react';
import {Box, Text, HStack, VStack} from 'native-base';
import {useQuery} from 'react-query';
import {Dimensions} from 'react-native';
import {paymentMethodApi} from '../../../utils/paymentMethodApi';
import {useAuth} from '@clerk/clerk-expo';
import PieChart from 'react-native-pie-chart';
import PaymentMethodsSkeleton from './PaymentMethodsSkeleton';

const PaymentMethodMetrics = (): JSX.Element => {
  const {userId} = useAuth();

  const screenWidth = Dimensions.get('window').width;

  const [chartData, setChartData] = useState([]);

  const {data, isLoading} = useQuery('payment-statistics', async () => {
    const response = await paymentMethodApi.statistics(userId);

    const chartDataFormatted = Object.entries(response?.percentage).reduce(
      (acc, cr) => {
        const [_key, value] = cr;
        acc.push(Number(value.toFixed(4)));

        return acc;
      },
      [],
    );

    setChartData(chartDataFormatted);

    return response;
  });

  const widthAndHeight = screenWidth;

  const series = [1, 1, 1, 1];
  const sliceColor = ['#004899', '#3A4750', '#FF9A3C', '#b83b5e'];

  return (
    <>
      <VStack paddingY={6}>
        <Box w={'100%'} marginBottom={5}>
          <Text fontSize={'2xl'} textAlign={'center'} bold>
            Métodos de pagamentos usados:
          </Text>
        </Box>
        {isLoading ? (
          <PaymentMethodsSkeleton />
        ) : (
          <HStack w={'100%'} justifyContent={'space-around'}>
            <PieChart
              widthAndHeight={widthAndHeight / 2}
              series={chartData.length > 0 ? chartData : series}
              coverRadius={0.7}
              coverFill="#fff"
              sliceColor={sliceColor}
            />
            <VStack>
              {Object.entries(data.integer).map(([key, value], index) => {
                return (
                  <HStack marginY={2} key={index}>
                    <Box
                      marginRight={5}
                      w={5}
                      backgroundColor={sliceColor[index]}
                      borderRadius={20}
                    />
                    <Text bold>
                      {key}: {value} ({(data.percentage[key] * 100).toFixed(2)}
                      %)
                    </Text>
                  </HStack>
                );
              })}

              <Text marginTop={6} fontSize={'lg'} bold>
                total: {data.total}
              </Text>
            </VStack>
          </HStack>
        )}
      </VStack>
    </>
  );
};
export default PaymentMethodMetrics;
