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
  ScrollView,
} from 'native-base';
import CircleBorder from '../../components/CircleBorder';
import {Icon} from '../../components/Icon';
import type {StackParamsList} from '../../types/rootStackParamListType';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSignUp} from '@clerk/clerk-expo';
import {Alert} from 'react-native';

const Register = ({
  navigation,
}: NativeStackScreenProps<StackParamsList, 'Register'>): JSX.Element => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailFocused, setIsEmailFocused] = useState<boolean>(false);
  const [isNameFocused, setIsNameFocused] = useState<boolean>(false);
  const [isPasswordFocused, setPasswordFocused] = useState<boolean>(false);
  const [isRepeatPasswordFocused, setRepeatPasswordFocused] =
    useState<boolean>(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {signUp, setActive} = useSignUp();

  const [isCodeFocused, setIsCodeFocused] = useState<boolean>(false);
  const [code, setCode] = useState('');

  const verifyCode = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({session: completeSignUp.createdSessionId});
      navigation.navigate('Tabs');
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onChangeText = text => {
    // remove qualquer não-dígito do valor inserido
    let cleaned = text.replace(/\D/g, '');
    // limita a 6 dígitos
    cleaned = cleaned.slice(0, 6);
    setCode(cleaned);
  };

  const handleSubmit = async () => {
    if (password !== repeatPassword) {
      Alert.alert('As senhas devem ser as mesmas.');
      setRepeatPassword('');
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({strategy: 'email_code'});
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const verifyCodeRender = () => {
    return (
      <FormControl mt={16}>
        <VStack minW="100%" padding={'40px'} alignItems={'center'}>
          <FormControl.Label>
            <Text fontSize={'xl'} bold marginBottom={10}>
              CODIGO DE VERIFICAÇÃO
            </Text>
          </FormControl.Label>
          <Input
            size={'2xl'}
            borderBottomWidth={2}
            variant="rounded"
            type="text"
            value={code}
            mb={10}
            textAlign={'center'}
            onFocus={() => setIsCodeFocused(true)}
            onChangeText={onChangeText}
            borderBottomColor={
              code !== '' || isCodeFocused ? '#FF9A3C' : 'gray.500'
            }
          />
          <Text w={'80%'} textAlign={'center'}>
            Acesse seu email para ver seu codigo de verifição
          </Text>

          <VStack alignItems="center" w="100%">
            <Button
              marginTop="80px"
              bgColor="#3A4750"
              minW="200px"
              borderRadius={30}
              padding="15px"
              onPress={verifyCode}
              _spinner={{size: 'lg'}}>
              <Text fontSize={24} color="white" fontWeight="medium">
                VALIDAR
              </Text>
            </Button>
          </VStack>
        </VStack>
      </FormControl>
    );
  };

  const registerRender = () => {
    return (
      <FormControl mt={16} isRequired={true}>
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
          />

          <FormControl.Label
            position="absolute"
            left={10}
            top={isNameFocused || name !== '' ? '108px' : '138px'}
            _text={{
              color: isNameFocused ? '#FF9A3C' : 'gray.500',
            }}>
            NOME
          </FormControl.Label>
          <Input
            onChangeText={newText => setName(newText)}
            onFocus={() => setIsNameFocused(true)}
            onBlur={() => {
              if (name === '') {
                setIsNameFocused(false);
              }
            }}
            borderBottomWidth={2}
            variant="underlined"
            type="text"
            borderBottomColor={isNameFocused ? '#FF9A3C' : 'gray.500'}
            mb={10}
          />

          <FormControl.Label
            mt={7}
            position="absolute"
            left={10}
            top={isPasswordFocused || password !== '' ? '172px' : '202px'}
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
            mb={10}
            borderBottomColor={isPasswordFocused ? '#FF9A3C' : 'gray.500'}
            variant="underlined"
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'Eye' : 'EyeOff'} />
              </Pressable>
            }
          />

          <FormControl.Label
            mt={7}
            position="absolute"
            left={10}
            top={
              isRepeatPasswordFocused || repeatPassword !== ''
                ? '260px'
                : '285px'
            }
            _text={{
              color: isRepeatPasswordFocused ? '#FF9A3C' : 'gray.500',
            }}>
            CONFIRMAR SENHA
          </FormControl.Label>
          <Input
            onChangeText={newText => setRepeatPassword(newText)}
            onFocus={() => setRepeatPasswordFocused(true)}
            onBlur={() => {
              if (repeatPassword === '') {
                setRepeatPasswordFocused(false);
              }
            }}
            borderBottomWidth={2}
            borderBottomColor={isRepeatPasswordFocused ? '#FF9A3C' : 'gray.500'}
            variant="underlined"
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Icon name={showPassword ? 'Eye' : 'EyeOff'} />
              </Pressable>
            }
          />

          <VStack alignItems="center" mt={'5'}>
            <Text fontSize="md">Já tem conta? Clique em</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text fontSize="md" fontWeight="bold">
                logar na conta.
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
                REGISTRAR
              </Text>
            </Button>
          </VStack>
        </VStack>
      </FormControl>
    );
  };

  return (
    <Box safeArea>
      <ScrollView>
        <CircleBorder />

        <Box alignItems="center" minW={100} mt={48}>
          <Heading fontSize="5xl" fontWeight="medium">
            Inventory
          </Heading>
          {pendingVerification ? verifyCodeRender() : registerRender()}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Register;
