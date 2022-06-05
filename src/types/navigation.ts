import type {
    StackNavigationProp,
    StackScreenProps,
  } from '@react-navigation/stack';
import { Team } from './team';
  
  export type RootStackParamList = {
    Home: {param: string};
    Teams: undefined;
    PlayerList: {team: string};
  };
  
  export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;
  
    export type HomeScreenProps = StackNavigationProp<RootStackParamList> ;
    export type TeamsScreenProps = StackNavigationProp<RootStackParamList> ;
    export type PlayerListScreenProps = StackNavigationProp<RootStackParamList>;
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }
  