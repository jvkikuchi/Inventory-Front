import {useState} from 'react';
import React from 'react';
import {
  Box,
  Text,
  Input,
  FormControl,
  Pressable,
  Button,
  Heading,
  VStack,
} from 'native-base';

import {Icon} from '../../components/Icon';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box alignItems="center" minW={100} mt={48}>
      <Heading fontSize="5xl" fontWeight="medium">
        Inventory
      </Heading>
      <FormControl mt={16}>
        <VStack minW="100%" padding={'40px'}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            borderBottomWidth={2}
            variant="underlined"
            type="text"
            _focus={{
              borderBottomColor: 'orange.500',
              borderColor: 'orange.500',
            }}
          />
          <FormControl.Label mt={7}>Password</FormControl.Label>
          <Input
            borderBottomWidth={2}
            _focus={{borderBottomColor: 'orange.500'}}
            variant="underlined"
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'Eye' : 'EyeOff'} />
              </Pressable>
            }
          />
          <VStack alignItems="center" mt={'5'}>
            <Text fontSize="md">Não tem conta ? Clique em</Text>
            <Text fontSize="md" fontWeight="bold">
              criar conta
            </Text>
          </VStack>
          <VStack alignItems="center" w="100%">
            <Button
              marginTop="80px"
              bgColor="orange.500"
              minW="200px"
              borderRadius={30}
              padding="15px">
              <Text fontSize={24} color="white" fontWeight="medium">
                ENTRAR
              </Text>
            </Button>
          </VStack>
        </VStack>
      </FormControl>
    </Box>
  );
};
