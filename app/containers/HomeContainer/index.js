import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import {
  selectHomeContainer,
  selectItuneCollectionData,
  selectItuneCollectionError,
  selectItuneCollectionName
} from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchItuneCollection,
  dispatchClearItuneCollection,
  intl,
  itunecollectionData = {},
  itunecollectionError = null,
  itunecollectionName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Effects will be called instead of componentDidMount, componentDidUpdate, componentWillRecieveProps
    // This effect will be called for every render.
    const loaded = get(itunecollectionData, 'results', null) || itunecollectionError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [itunecollectionData]);

  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
    dispatchItuneCollection(rName);
      setLoading(true);
    } else {
      dispatchClearItuneCollection();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(itunecollectionData, 'results', []);
    const totalCount = get(itunecollectionData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {itunecollectionName && (
              <div>
                <T id="search_query" values={{ itunecollectionName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard key={index}>
                <div><img src={item.artworkUrl100}/></div>
                <div> Artist Name: {item.artistName}</div>
                <div>Collection Name: {item.collectionName}</div>
                <div>Collection Price: {item.collectionPrice}</div>
                <div>Collection Kind: {item.kind}</div>
                <div>Collection Release Date: {item.releaseDate}</div>
                <div>Primary Genre Name: {item.primaryGenreName}</div>
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let ituneError;
    if (itunecollectionError) {
      ituneError = itunecollectionError;
    } else if (!get(itunecollectionData, 'resultCount', 0)) {
      ituneError = 'respo_search_default';
    }
    return (
      !loading &&
      ituneError && (
        <CustomCard
          color={itunecollectionError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'repo_list' })}
        >
          <T id={ituneError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard
        title={intl.formatMessage({ id: 'repo_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={itunecollectionName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItuneCollection: PropTypes.func,
  dispatchClearItuneCollection: PropTypes.func,
  intl: PropTypes.object,
  itunecollectionData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  itunecollectionError: PropTypes.object,
  itunecollectionName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  itunecollectionData: selectItuneCollectionData(),
  itunecollectionError: selectItuneCollectionError(),
  itunecollectionName: selectItuneCollectionName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItuneCollection, clearItuneCollection } = homeContainerCreators;
  return {
    dispatchItuneCollection: itunecollectionName => dispatch(requestGetItuneCollection(itunecollectionName)),
    dispatchClearItuneCollection: () => dispatch(clearItuneCollection())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
