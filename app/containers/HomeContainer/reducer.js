/*
 *
 * HomeContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: homeContainerTypes,
  Creators: homeContainerCreators
} = createActions({
  requestGetItuneCollection: ['itunecollectionName'],
  successGetItuneCollection: ['data'],
  failureGetItuneCollection: ['error'],
  clearItuneCollection: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const homeContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case homeContainerTypes.REQUEST_GET_ITUNE_COLLECTION:
        return initialState.set('itunecollectionName', action.itunecollectionName);
      case homeContainerTypes.CLEAR_ITUNE_COLLECTION:
        return initialState.set('itunecollectionName', null).set('itunecollectionData', null);
      case homeContainerTypes.SUCCESS_GET_ITUNE_COLLECTION:
        return state.set('itunecollectionData', action.data);
      case homeContainerTypes.FAILURE_GET_ITUNE_COLLECTION:
        return state.set(
          'itunecollectionError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default homeContainerReducer;
