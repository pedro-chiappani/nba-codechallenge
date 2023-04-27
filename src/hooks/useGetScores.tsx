import {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL, API_TOKEN} from '@env';
import {Matches} from '../types/match';

function useGetMatches() {
  const [dat, setDat] = useState<Matches[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [err, setErr] = useState(null);
  const date = new Date();
  date.setDate(date.getDate() - 1);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  useEffect(() => {
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

  return {dat, load, err};
}

export default useGetMatches;
