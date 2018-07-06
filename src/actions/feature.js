import { FEATURE_LOADED } from '../types';
import api from '../api';

export const featureLoaded = feature => ({
  type: FEATURE_LOADED,
  feature
});

export const loadFeatureMatchCards = () => dispatch =>
  api.feature.loadFeatureMatches().then(resp => {
    dispatch(featureLoaded(resp.data));
  });
