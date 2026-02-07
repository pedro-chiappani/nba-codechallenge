import {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Matches} from '../types/match';

function useGetScores() {
  const [dat, setDat] = useState<Matches[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [err, setErr] = useState(null);

  const fetchData = useCallback(() => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const currentDate = `${year}-${month}-${day}`;
    // let currentDate = "2023-05-27"

    setLoad(true);
    axios
      .get(API_URL + `/ScoresBasic/${currentDate}?key=${API_TOKEN}`)
      .then(response => {
        setDat(response.data);
      })
      .catch(err => {
        setErr(err);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {dat, load, err, refetch: fetchData};
}

export default useGetScores;
