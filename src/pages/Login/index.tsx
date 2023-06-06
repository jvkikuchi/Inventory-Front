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
import CircleBorder from '../../components/CircleBorder';
import {Icon} from '../../components/Icon';
import type {StackParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSignIn} from '@clerk/clerk-expo';
import {Alert} from 'react-native';

const Login = ({
  navigation,
}: NativeStackScreenProps<StackParamsList, 'Login'>): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isPasswordFocused, setPasswordFocused] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {signIn, setActive} = useSignIn();

  const handleSubmit = async () => {
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({session: completeSignIn.createdSessionId});
      navigation.navigate('Tabs');
    } catch (err: any) {
      // @ts-ignore
      Alert.alert(err.errors[0].message); // Exibe o erro em um alert

      console.error({x: JSON.stringify(err.errors[0].message)});
    }
  };

  return (
    <Box safeArea>
      <CircleBorder />

      <Box alignItems="center" minW={100} mt={48}>
        <Heading fontSize="5xl" fontWeight="medium">
          Inventory
        </Heading>
        <FormControl mt={16}>
          <VStack minW="100%" padding={'40px'}>
            <FormControl.Label
              position="absolute"
              left={10}
              top={isEmailFocused || email !== '' ? '24px' : '56px'}
              _text={{
                color: isEmailFocused ? '#FF9A3C' : 'gray.500',
              }}>
              EMAIL
            </FormControl.Label>
            <Input
              onChangeText={newText => setEmail(newText)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => {
                if (email === '') {
                  setIsEmailFocused(false);
                }
              }}
              borderBottomWidth={2}
              variant="underlined"
              type="text"
              borderBottomColor={isEmailFocused ? '#FF9A3C' : 'gray.500'}
              mb={10}
              testID="email-input"
            />
            <FormControl.Label
              mt={7}
              position="absolute"
              left={10}
              top={isPasswordFocused || password !== '' ? '88px' : '118px'}
              _text={{
                color: isPasswordFocused ? '#FF9A3C' : 'gray.500',
              }}>
              SENHA
            </FormControl.Label>
            <Input
              onChangeText={newText => setPassword(newText)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => {
                if (password === '') {
                  setPasswordFocused(false);
                }
              }}
              borderBottomWidth={2}
              borderBottomColor={isPasswordFocused ? '#FF9A3C' : 'gray.500'}
              variant="underlined"
              type={showPassword ? 'text' : 'password'}
              testID="password-input"
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'Eye' : 'EyeOff'} />
                </Pressable>
              }
            />
            <VStack alignItems="center" mt={'5'}>
              <Text fontSize="md">Não tem conta ? Clique em</Text>
              <Pressable onPress={() => navigation.navigate('Register')}>
                <Text fontSize="md" fontWeight="bold">
                  criar conta
                </Text>
              </Pressable>
            </VStack>
            <VStack alignItems="center" w="100%">
              <Button
                marginTop="80px"
                bgColor="#3A4750"
                minW="200px"
                borderRadius={30}
                padding="15px"
                onPress={handleSubmit}
                _spinner={{size: 'lg'}}>
                <Text fontSize={24} color="white" fontWeight="medium">
                  ENTRAR
                </Text>
              </Button>
            </VStack>
          </VStack>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Login;
