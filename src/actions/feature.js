import { FEATURE_SELECTED } from '../types';
import api from '../api';

export const featureSelected = feature => ({
  type: FEATURE_SELECTED,
  feature
});

export const loadFeatureMatches = () => dispatch =>
  api.feature.loadFeatureMatches().then(resp => {
    dispatch(featureSelected(resp.data));
  });
