import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Matches} from '../types/match';

function useGetMatches() {
  const [data, setData] = useState<Matches[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
//${currentDate}
  useEffect(() => {
    setLoading(true);
    axios
    .get(API_URL + `/ScoresBasic/${currentDate}?key=${API_TOKEN}`)
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

export default useGetMatches;
