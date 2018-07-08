import { MATCHCARD_LOADED, MATCH_CREATED, MATCH_DELETED } from '../types';
import api from '../api';

export const matchCardLoaded = match_card => ({
  type: MATCHCARD_LOADED,
  match_card
});

export const matchCreated = match => ({
  type: MATCH_CREATED,
  match
});

export const deletedMatch = matchId => ({
  type: MATCH_DELETED,
  matchId
});

export const updateMatchCard = data => dispatch =>
  api.matchcard.updateMatchCard(data);

export const loadMatchCard = id => dispatch =>
  api.matchcard.loadMatchCard(id).then(resp => {
    dispatch(matchCardLoaded(resp.data));
  });

export const createMatch = data => dispatch =>
  api.matchcard.createMatch(data).then(resp => {
    dispatch(matchCreated(resp.data));
  });

export const deleteMatch = id => dispatch =>
  api.matchcard.deleteMatch(id).then(() => {
    dispatch(deletedMatch(id));
  });
