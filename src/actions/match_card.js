import { MATCHCARD_LOADED } from '../types';
import api from '../api';

export const matchCardLoaded = match_card => ({
  type: MATCHCARD_LOADED,
  match_card
});

export const updateMatchCard = data => dispatch =>
  api.matchcard.updateMatchCard(data);

export const loadMatchCard = id => dispatch =>
  api.matchcard.loadMatchCard(id).then(resp => {
    dispatch(matchCardLoaded(resp.data.match_card));
  });
