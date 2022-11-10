import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from 'ui/tests/utils';
import { MsgCounterpartyChannel } from '@models';
import CounterpartyChannel from '.';

// ==================================
// mocks
// ==================================
  jest.mock('ui/components/name', () => (props: JSX.IntrinsicElements['div']) => (
    <div id="Name" {...props} />
  ));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/IBCCounterpartyChannel', () => {
  it('matches snapshot', () => {
    const message = MsgCounterpartyChannel.fromJson({
      category: 'ibc',
      type: 'MsgCounterpartyChannel',
      signer: 'desmos1jrld5g998gqm4yx26l6cvhxz7y5adgxquy94nz',
      json: [
        {
          denom: 'udaric',
          amount: '2000000',
        },
      ],
    });
    const component = renderer.create(
      <MockTheme>
        <CounterpartyChannel message={message} />
      </MockTheme>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
