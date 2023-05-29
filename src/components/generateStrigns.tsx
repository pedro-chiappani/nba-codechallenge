import useGetTeams from '../hooks/useGetTeams';
import {Matches} from '../types/match';
import {equipos} from '../hooks/equipos';
import {Team} from '../types/team';

const cadena = (match: Matches) => {
  const {dato, loado, erro} = useGetTeams();
  let home = dato?.find(team => team.TeamID == match.HomeTeamID);
  let away = dato?.find(team => team.TeamID == match.AwayTeamID);
  let pers1 = equipos.filter(e => e.equipo == home?.Name)[0]
    ? '*' +
      equipos.filter(e => e.equipo == home?.Name)[0]['equipo'] +
      '* ' +
      '(' +
      equipos.filter(e => e.equipo == home?.Name)[0]['persona'] +
      ')'
    : home?.Name;
  let pers2 = equipos.filter(e => e.equipo == away?.Name)[0]
    ? '*' +
      equipos.filter(e => e.equipo == away?.Name)[0]['equipo'] +
      '* ' +
      '(' +
      equipos.filter(e => e.equipo == away?.Name)[0]['persona'] +
      ')'
    : away?.Name;
  if (match.IsClosed) {
    let res: string;
    if (
      (match.HomeTeamScore != null ? match.HomeTeamScore : 0) >
      (match.AwayTeamScore != null ? match.AwayTeamScore : 0)
    ) {
      res = ' le ganaron a los ';
    } else {
      res = ' perdieron contra los ';
    }
    return (
      'Los ' +
      pers1 +
      res +
      pers2 +
      ' ' +
      match.HomeTeamScore +
      '-' +
      match.AwayTeamScore
    );
  } else {
    let hora =
      match.DateTimeUTC != null
        ? match.DateTimeUTC.toLocaleString().split('T')[1].split(':')
        : ' ';
    let mmostrar =
      (parseInt(hora[0]) - 3 < 0
        ? parseInt(hora[0]) + 24 - 3
        : parseInt(hora[0]) - 3) +
      ':' +
      hora[1];
    return pers1 + ' vs ' + pers2 + ' ' + mmostrar + ' ' + 'hs';
  }
};

export default cadena;
