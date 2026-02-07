import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Player} from '../types/player';

function useGetPlayer(playerId: string) {
  const [data, setData] = useState<Player[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    axios
      .get(API_URL + `/Players/${playerId}?key=${API_TOKEN}`)
      .then(response => {
        setData(response.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [playerId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {data, loading, error, refetch: fetchData};
}

export default useGetPlayer;
