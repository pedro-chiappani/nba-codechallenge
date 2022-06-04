import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Player} from '../types/player';

function useGetPlayer(teamId: number) {
  const [data, setData] = useState<Player[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL + `/player/${teamId}?key=${API_TOKEN}`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [teamId]);

  return {data, loading, error};
}

export default useGetPlayer;
