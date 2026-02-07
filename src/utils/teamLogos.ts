// Mapeo de nombres de equipos a los recursos de imagen locales
export const teamLogos: {[key: string]: any} = {
  'Trail Blazers': require('../assets/images/POR.png'),
  Bucks: require('../assets/images/MIL.png'),
  Bulls: require('../assets/images/CHI.png'),
  Cavaliers: require('../assets/images/CLE.png'),
  Celtics: require('../assets/images/BOS.png'),
  Clippers: require('../assets/images/LAC.png'),
  Grizzlies: require('../assets/images/MEM.png'),
  Hawks: require('../assets/images/ATL.png'),
  Heat: require('../assets/images/MIA.png'),
  Hornets: require('../assets/images/CHA.png'),
  Jazz: require('../assets/images/UTH.png'),
  Kings: require('../assets/images/SAC.png'),
  Knicks: require('../assets/images/NY.png'),
  Lakers: require('../assets/images/LAL.png'),
  Magic: require('../assets/images/ORL.png'),
  Mavericks: require('../assets/images/DAL.png'),
  Nets: require('../assets/images/BKN.png'),
  Nuggets: require('../assets/images/DEN.png'),
  Pacers: require('../assets/images/IND.png'),
  Pelicans: require('../assets/images/NO.png'),
  Pistons: require('../assets/images/DET.png'),
  Raptors: require('../assets/images/TOR.png'),
  Rockets: require('../assets/images/HOU.png'),
  '76ers': require('../assets/images/PHI.png'),
  Spurs: require('../assets/images/SA.png'),
  Suns: require('../assets/images/PHO.png'),
  Thunder: require('../assets/images/OKC.png'),
  Timberwolves: require('../assets/images/MIN.png'),
  Warriors: require('../assets/images/GS.png'),
  Wizards: require('../assets/images/WAS.png'),
};

// Función helper para obtener el logo de un equipo
export const getTeamLogo = (teamName: string): any | null => {
  // Buscar coincidencia exacta primero
  if (teamLogos[teamName]) {
    return teamLogos[teamName];
  }

  // Buscar por coincidencia parcial (ej: "Los Angeles Lakers" contiene "Lakers")
  const matchingKey = Object.keys(teamLogos).find(
    key => teamName.includes(key) || key.includes(teamName),
  );

  return matchingKey ? teamLogos[matchingKey] : null;
};
