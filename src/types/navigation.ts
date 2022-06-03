import type {
    StackNavigationProp,
    StackScreenProps,
  } from '@react-navigation/stack';
  
  export type RootStackParamList = {
    Home: {param: string};
    Teams: undefined;
  };
  
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;
  
    export type HomeScreenProps = StackNavigationProp<RootStackParamList> ;
    export type TeamsScreenProps = StackNavigationProp<RootStackParamList> ;
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }
  