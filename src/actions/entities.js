import { ENTITIES_LOADED } from '../types';
import api from '../api';

// eslint-disable-next-line
export const entitiesLoaded = entities => ({
  type: ENTITIES_LOADED,
  entities
});

export const loadEntities = () => dispatch =>
  api.entities.loadEntities().then(resp => {
    dispatch(entitiesLoaded(resp.data));
  });
