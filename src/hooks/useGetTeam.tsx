import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Team} from '../types/team';

function useGetTeam(teamId: number) {
    const [data, setData] = useState<Team[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
      setLoading(true);
      axios
        .get(API_URL + `/teams/${teamId}?key=${API_TOKEN}`)
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

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    return {data, loading, error, refetch: fetchData};
  }

  export default useGetTeam;
