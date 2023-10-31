import type {
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import {Player} from './player';
import {Team} from './team';

export type RootStackParamList = {
  Home: {param: string};
  Icon: undefined;
  Teams: undefined;
  PlayerList: {
    team: string;
    primary: string;
    secondary: string;
    teamName: string;
  };
  Player: {player: Player; primary: string; secondary: string};
  Team: {team: string;
    primary: string;
    secondary: string;
    teamName: string;}
  NBApp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeScreenProps = StackNavigationProp<RootStackParamList>;
export type IconScreenProps = StackNavigationProp<RootStackParamList>;
export type TeamsScreenProps = StackNavigationProp<RootStackParamList>;
export type PlayerListScreenProps = StackNavigationProp<RootStackParamList>;
export type PlayerScreenProps = StackNavigationProp<RootStackParamList>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
