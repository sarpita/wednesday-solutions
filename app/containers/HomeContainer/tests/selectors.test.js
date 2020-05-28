import { fromJS } from 'immutable';
import {
  selectHomeContainer,
  selectItuneCollectionName,
  selectItuneCollectionData,
  selectItuneCollectionError
} from '../selectors';

describe('HomeContainer selector tests', () => {
  let mockedState;
  let itunecollectionName;
  let itunecollectionData;
  let itunecollectionError;

  beforeEach(() => {
    itunecollectionName = 'mac';
    itunecollectionData = { totalCount: 1, items: [{ itunecollectionName }] };
    itunecollectionError = 'There was some error while fetching the repository details';

    mockedState = {
      homeContainer: fromJS({
        itunecollectionName,
        itunecollectionData,
        itunecollectionError
      })
    };
  });
  it('should select the homeContainer state', () => {
    const homeContainerSelector = selectHomeContainer();
    expect(homeContainerSelector(mockedState)).toEqual(
      mockedState.homeContainer.toJS()
    );
  });
  it('should select the repoName', () => {
    const collectionSelector = selectItuneCollectionName();
    expect(collectionSelector(mockedState)).toEqual(itunecollectionName);
  });

  it('should select itunecollectionData', () => {
    const collectionDataSelector = selectItuneCollectionData();
    expect(collectionDataSelector(mockedState)).toEqual(itunecollectionData);
  });

  it('should select the itunecollectionError', () => {
    const collectionSelector = selectItuneCollectionError();
    expect(collectionSelector(mockedState)).toEqual(itunecollectionError);
  });
});
