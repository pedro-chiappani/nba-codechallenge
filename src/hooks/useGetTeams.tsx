import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Team} from '../types/team';
import {Player} from '../types/player';

function useGetTeams() {
  const [data, setData] = useState<Team[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL + `/teams?key=${API_TOKEN}`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {data, loading, error};
}

export default useGetTeams;
