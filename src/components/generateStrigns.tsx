import useGetTeams from "../hooks/useGetTeams";
import { Matches } from "../types/match";
import { equipos } from "../hooks/equipos";
import { Team } from "../types/team";

const cadena = (match: Matches) => {
    const {dato,loado,erro} = useGetTeams();
    let home = dato?.find(team => team.TeamID == match.HomeTeamID);
    let away = dato?.find(team => team.TeamID == match.AwayTeamID);
    let hora = (match.DateTimeUTC != null ? ((match.DateTimeUTC.toLocaleString().split('T'))[1]).split(':') : " ")
    let mmostrar = ((parseInt(hora[0]) - 3 < 0 ? parseInt(hora[0])+24-3 : parseInt(hora[0]) -3) +':'+ hora[1])
    let pers1 = (equipos.filter(e => e.equipo == (home?.Name)))
    let pers2 = (equipos.filter(e => e.equipo == (away?.Name)))
  
    return "*"+home?.Name+"*"+
    " "+"("+pers1?.map(e => e.persona).toString()+")"+" vs "+
    "*"+away?.Name+"*"+
    " "+"("+pers2?.map(e => e.persona).toString()+")"+" "+mmostrar+" "+"hs"
  
  }

export default cadena;