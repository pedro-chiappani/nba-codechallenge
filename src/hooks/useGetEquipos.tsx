import {useEffect, useState} from 'react';
import axios from 'axios';
import { Equipo } from '../types/equipo';
import base64 from 'react-native-base64';


function useGetEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
    .get('https://api.github.com/repos/pedro-chiappani/nba-codechallenge/contents/src/hooks/equipos.json?ref=prod')
    .then(response => {
        const file = JSON.parse(base64.decode(response.data.content.replace(/\n/g, '')));
        setEquipos(file);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {equipos, loading, error};

}

export default useGetEquipos;
