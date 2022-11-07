import React from 'react';
import classnames from 'classnames';
import numeral from 'numeral';
import dayjs from 'ui/utils/dayjs';
import Link from 'next/link';
import { TRANSACTION_DETAILS, BLOCK_DETAILS } from '@utils/go_to_page';
import { Typography, Divider } from '@material-ui/core';
import { VariableSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

import { mergeRefs } from '@utils/merge_refs';
import SingleTransactionMobile from '@components/single_transaction_mobile';
import Loading from '@components/loading';
import Tag from '@components/tag';
import { useList, useListRow } from '@hooks';
import { getMiddleEllipsis } from 'ui/utils/get_middle_ellipsis';
import { useStyles } from './styles';
import { TransactionsListState } from '../../types';

const Mobile: React.FC<TransactionsListState> = ({
  className,
  itemCount,
  loadMoreItems,
  isItemLoaded,
  transactions,
}) => {
  const classes = useStyles();

  const { listRef, getRowHeight, setRowHeight } = useList();

  const items = transactions.map((x) => ({
    block: (
      <Link href={BLOCK_DETAILS(x.height)} passHref>
        <Typography variant="body1" component="a">
          {numeral(x.height).format('0,0')}
        </Typography>
      </Link>
    ),
    hash: (
      <Link href={TRANSACTION_DETAILS(x.hash)} passHref>
        <Typography variant="body1" component="a">
          {getMiddleEllipsis(x.hash, {
            beginning: 15,
            ending: 10,
          })}
        </Typography>
      </Link>
    ),
    type: (
      <div>
        <Tag value={x.type[0]} theme="six" />
        {x.messages.count > 1 && ` + ${x.messages.count - 1}`}
      </div>
    ),
    time: dayjs.utc(x.timestamp).fromNow(),
  }));

  return (
    <div className={classnames(className, classes.root)}>
      <AutoSizer>
        {({ height, width }) => {
          return (
            <InfiniteLoader
              isItemLoaded={isItemLoaded ?? (() => true)}
              itemCount={itemCount}
              loadMoreItems={
                loadMoreItems ??
                (() => {
                  // do nothing
                })
              }
            >
              {({ onItemsRendered, ref }) => (
                <List
                  className="List"
                  height={height}
                  itemCount={itemCount}
                  itemSize={getRowHeight}
                  onItemsRendered={onItemsRendered}
                  ref={mergeRefs(listRef, ref)}
                  width={width}
                >
                  {({ index, style }) => {
                    const { rowRef } = useListRow(index, setRowHeight);
                    if (!isItemLoaded?.(index)) {
                      return (
                        <div style={style}>
                          <div ref={rowRef}>
                            <Loading />
                          </div>
                        </div>
                      );
                    }
                    const item = items[index];
                    return (
                      <div style={style}>
                        <div ref={rowRef}>
                          <SingleTransactionMobile {...item} />
                          {index !== itemCount - 1 && <Divider />}
                        </div>
                      </div>
                    );
                  }}
                </List>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default Mobile;
