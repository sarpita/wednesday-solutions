import {
  homeContainerReducer,
  initialState,
  homeContainerTypes
} from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('HomContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(homeContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const itunecollectionName = 'Maroon 5';
    const expectedResult = state.set('itunecollectionName', itunecollectionName);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.REQUEST_GET_ITUNE_COLLECTION,
        itunecollectionName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Maroon 5' };
    const expectedResult = state.set('itunecollectionData', data);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.SUCCESS_GET_ITUNE_COLLECTION,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = state.set('itunecollectionError', error);
    expect(
      homeContainerReducer(state, {
        type: homeContainerTypes.FAILURE_GET_ITUNE_COLLECTION,
        error
      })
    ).toEqual(expectedResult);
  });
});
