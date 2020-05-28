import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the homeContainer state domain
 */

const selectHomeContainerDomain = state =>
  (state.homeContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by HomeContainer
 */

export const selectHomeContainer = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => substate
  );

export const selectItuneCollectionData = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'itunecollectionData', null)
  );

export const selectItuneCollectionError = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'itunecollectionError', null)
  );

export const selectItuneCollectionName = () =>
  createSelector(
    selectHomeContainerDomain,
    substate => _.get(substate, 'itunecollectionName', null)
  );

export default selectHomeContainer;
