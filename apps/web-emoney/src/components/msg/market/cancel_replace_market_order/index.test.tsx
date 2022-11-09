import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from 'ui/tests/utils';
import MsgCancelReplaceMarketOrder from '@models/emoney/msg/market/msg_cancel_replace_market_order';
import CancelReplaceMarketOrder from '.';

// ==================================
// mocks
// ==================================
jest.mock('@components/name', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Name" {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/CancelReplaceMarketOrder', () => {
  it('matches snapshot', () => {
    const message = new MsgCancelReplaceMarketOrder({
      category: 'market',
      type: 'MsgCancelReplaceMarketOrder',
      owner: 'owner',
      originalClientOrderId: 'originalClientOrderId',
      newClientOrderId: 'newClientOrderId',
      timeInForce: 'Unspecified',
      source: 'source',
      destination: {
        denom: 'udarics',
        amount: 500000,
      },
    });
    const component = renderer.create(
      <MockTheme>
        <CancelReplaceMarketOrder message={message} />
      </MockTheme>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
