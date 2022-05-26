import type {
    StackNavigationProp,
    StackScreenProps,
  } from '@react-navigation/stack';
  
  export type RootStackParamList = {
    HomeScreen: {param: string};
  };
  
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;
  
  export type HomeScreenProps = StackNavigationProp<RootStackParamList> ;
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }
  