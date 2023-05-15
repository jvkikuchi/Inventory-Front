import React, {useState} from 'react';
import {VStack, HStack, Box, Text, Image} from 'native-base';
import {statisticsApi} from '../../../utils/statisticsApi';
import {useAuth} from '@clerk/clerk-expo';
import {useQuery} from 'react-query';
import {
  VerticalAxis,
  HorizontalAxis,
  Chart,
  Line,
} from 'react-native-responsive-linechart';
import {format} from 'date-fns';

const ProductChart = (): JSX.Element => {
  const [lines, setLines] = useState([]);

  const valuesEixoX = [];
  const valuesEixoY = [];

  const {data, isLoading} = useQuery('product-statistics', async () => {
    const response = await statisticsApi.getProductStatistics(
      'user_2PU9RnRIVez69ZUkuJyaImYCtR0',
      26,
    );

    const {sell, add_to_stock, remove_from_stock} =
      response.movementsHistory.reduce(
        (acc, cr) => {
          const {movementType} = cr;
          const movementTypeLowerCase = movementType.toLowerCase();

          if (acc[movementTypeLowerCase]) {
            valuesEixoX.push(cr.date);
            valuesEixoY.push(cr.quantity);

            acc[movementTypeLowerCase].data.push({
              x: format(new Date(cr.date), 'dd/MM/yyyy HH:mm:ss'),
              y: cr.quantity,
            });

            console.log('werwe', {
              x: cr.date,
              y: cr.quantity,
            });
          }

          return acc;
        },
        {
          sell: {data: [], svg: 'blue'},
          add_to_stock: {data: [], svg: 'orange'},
          remove_from_stock: {data: [], svg: 'red'},
        },
      );

    setLines([sell, add_to_stock, remove_from_stock]);

    return response;
  });

  const tickValues = [
    new Date('2023-01-01T00:00:00.000+00:00'),
    new Date('2023-02-01T00:00:00.000+00:00'),
    new Date('2023-03-01T00:00:00.000+00:00'),
    new Date('2023-04-01T00:00:00.000+00:00'),
    new Date('2023-05-01T00:00:00.000+00:00'),
    new Date('2023-06-01T00:00:00.000+00:00'),
    new Date('2023-07-01T00:00:00.000+00:00'),
    new Date('2023-08-01T00:00:00.000+00:00'),
    new Date('2023-09-01T00:00:00.000+00:00'),
    new Date('2023-10-01T00:00:00.000+00:00'),
  ];

  console.log(
    tickValues.map(date => [
      date.getTime(),
      format(new Date(date.getTime()), 'dd/MM/yyyy'),
    ]),
  );
  return (
    <VStack flex={1}>
      {isLoading ? (
        <Box>
          <Text>Pedro</Text>
        </Box>
      ) : (
        <Chart
          style={{width: '100%', marginBottom: 20}}
          padding={{left: 40, bottom: 20, right: 20, top: 10}}
          xDomain={{min: 5, max: 8}}>
          <VerticalAxis
            tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
            theme={{
              axis: {stroke: {color: '#aaa', width: 2}},
              ticks: {stroke: {color: '#aaa', width: 2}},
              labels: {formatter: (v: number) => v.toFixed(2)},
            }}
          />
          <HorizontalAxis
            tickValues={tickValues.map(date => date.getTime())}
            tickCount={9}
            theme={{
              axis: {stroke: {color: '#aaa', width: 2}},
              ticks: {stroke: {color: '#aaa', width: 2}},
              labels: {
                label: {rotation: 50, fontSize: 12},
                formatter: v => `${format(new Date(v), 'dd/MM/yyyy')}`,
              },
            }}
          />

          <Line
            data={[
              {x: new Date('2023-10-01T00:00:00.000+00:00').getTime(), y: 15},
              {x: new Date('2023-07-01T00:00:00.000+00:00').getTime(), y: 6},
              {x: new Date('2023-01-01T00:00:00.000+00:00').getTime(), y: 15},
              {x: new Date('2023-06-01T00:00:00.000+00:00').getTime(), y: 3},
            ]}
            smoothing="cubic-spline"
            tension={0.3}
            theme={{stroke: {color: 'orange', width: 2}}}
          />
        </Chart>
      )}
    </VStack>
  );
};

export default ProductChart;
