/**
 * Test homeContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getRepos } from '@services/repoApi';
import { apiResponseGenerator } from '@utils/testUtils';
import homeContainerSaga, { getItuneCollection } from '../saga';
import { homeContainerTypes } from '../reducer';

describe('HomeContainer saga tests', () => {
  const generator = homeContainerSaga();
  const itunecollectionName = 'mac';
  let getItuneCollectionGenerator = getItuneCollection({ itunecollectionName });

  it('should start task to watch for REQUEST_GET_ITUNE_COLLECTION action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(homeContainerTypes.REQUEST_GET_ITUNE_COLLECTION, getItuneCollection)
    );
  });

  it('should ensure that the action FAILURE_GET_ITUNE_COLLECTION is dispatched when the api call fails', () => {
    const res = getItuneCollectionGenerator.next().value;
    expect(res).toEqual(call(getRepos, itunecollectionName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching repo informations.'
    };
    expect(
      getItuneCollectionGenerator.next(apiResponseGenerator(false, errorResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.FAILURE_GET_ITUNE_COLLECTION,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_ITUNE_COLLECTION is dispatched when the api call succeeds', () => {
    getItuneCollectionGenerator = getItuneCollection({ itunecollectionName });
    const res = getItuneCollectionGenerator.next().value;
    expect(res).toEqual(call(getRepos, itunecollectionName));
    const reposResponse = {
      totalCount: 1,
      items: [{ repositoryName: itunecollectionName }]
    };
    expect(
      getItuneCollectionGenerator.next(apiResponseGenerator(true, reposResponse))
        .value
    ).toEqual(
      put({
        type: homeContainerTypes.SUCCESS_GET_ITUNE_COLLECTION,
        data: reposResponse
      })
    );
  });
});
