import { homeContainerTypes, homeContainerCreators } from '../reducer';

describe('HomeContainer action tests', () => {
  it('has a type of REQUEST_GET_ITUNE_COLLECTION', () => {
    const expected = {
      type: homeContainerTypes.REQUEST_GET_ITUNE_COLLECTION,
      itunecollectionName: 'itunecollectionName'
    };
    expect(homeContainerCreators.requestGetItuneCollection('itunecollectionName')).toEqual(
      expected
    );
  });
});
