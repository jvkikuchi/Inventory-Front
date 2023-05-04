export type CommonScreen = {
  Product: {
    productId: string;
  };
  UpseartProduct: undefined;
};

export type StackParamsList = {
  Register: undefined;
  Login: undefined;
  Tabs: undefined;
} & CommonScreen;

export type TabParamsList = {
  ListProducts: undefined;
} & CommonScreen;
