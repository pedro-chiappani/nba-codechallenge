import useGetTeams from '../hooks/useGetTeams';
import {Matches} from '../types/match';
import {equipos} from '../hooks/equipos';
import {Team} from '../types/team';

// retorna la cadena dependiendo si es un partido o un resultado
const cadena = (match: Matches) => {
  // obtengo todos los equipos desde la api
  const {dato, loado, erro} = useGetTeams();
  // filtro el equipo local
  let home = dato?.find(team => team.TeamID == match.HomeTeamID); 
  // filtro el equipo visitante
  let away = dato?.find(team => team.TeamID == match.AwayTeamID);
  // me fijo si el equipo local esta elegido
  let local = equipos.some(e => e.equipo == home?.Name);
  // me fijo si el equipo visitante esta elegido
  let visita = equipos.some(e => e.equipo == away?.Name);
  // se queda con el *nomEquipo*(persona) local en el caso que este elegido, si no solo nomEquipo
  let pers1 = equipos.filter(e => e.equipo == home?.Name)[0]
    ? '*' +                                                 
      equipos.filter(e => e.equipo == home?.Name)[0]['equipo'] +
      '* ' +
      '(' +
      equipos.filter(e => e.equipo == home?.Name)[0]['persona'] +
      ')'
    : home?.Name;
  // se queda con el *nomEquipo*(persona) visitante en el caso que este elegido, si no solo nomEquipo
  let pers2 = equipos.filter(e => e.equipo == away?.Name)[0] 
    ? '*' +                                                  
      equipos.filter(e => e.equipo == away?.Name)[0]['equipo'] +
      '* ' +
      '(' +
      equipos.filter(e => e.equipo == away?.Name)[0]['persona'] +
      ')'
    : away?.Name;
  // chequea si el partido ya termino
  if (match.IsClosed) { 
    let res: string;
    // genera el string de resultado si el equipo local o local y visitante estan elegidos
    if ((local && visita) || local) { 
      if (
        (match.HomeTeamScore != null ? match.HomeTeamScore : 0) >
        (match.AwayTeamScore != null ? match.AwayTeamScore : 0)
      ) {
        res = 'le ganaron a los';
      } else {
        res = 'perdieron contra los';
      }
      return `Los ${pers1} ${res} ${pers2} ${match.HomeTeamScore}-${match.AwayTeamScore}`;
    }
    // general el string si solo el equipo visitante esta elegido 
    else {                        
      if (
        (match.AwayTeamScore != null ? match.AwayTeamScore : 0) >
        (match.HomeTeamScore != null ? match.HomeTeamScore : 0)
      ) {
        res = 'le ganaron a los';
      } else {
        res = 'perdieron contra los';
      }
      return `Los ${pers2} ${res} ${pers1} ${match.HomeTeamScore}-${match.AwayTeamScore}`;
    }
  }
  // genera string de hora del partido 
  else {
    // genera el string de resultado si el equipo local o local y visitante estan elegidos
    if ((local && visita) || local) {
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
    // general el string si solo el equipo visitante esta elegido  
    else {
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
      return pers2 + ' vs ' + pers1 + ' ' + mmostrar + ' ' + 'hs';
    }
  }
};

export default cadena;
