import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Team} from '../types/team';

function useGetTeams() {
  const [dato, setDato] = useState<Team[]>([]);
  const [loado, setLoado] = useState<boolean>(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setLoado(true);
    axios
      .get(API_URL + `/teams?key=${API_TOKEN}`)
      .then(response => {
        setDato(response.data);
      })
      .catch(err => {
        setErro(err);
      })
      .finally(() => {
        setLoado(false);
      });
  }, []);

  return {dato, loado, erro};
}

export default useGetTeams;
