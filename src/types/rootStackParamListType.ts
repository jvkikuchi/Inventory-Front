export type CommonScreen = {
  Product: {
    productId: number;
  };
  UpseartProduct: undefined;
};

export type StackParamsList = {
  Register: undefined;
  Login: undefined;
  Tabs: undefined;
  VerifyToken: undefined;
} & CommonScreen;

export type TabParamsList = {
  ListProducts: undefined;
  Metrics: undefined;
} & CommonScreen;
