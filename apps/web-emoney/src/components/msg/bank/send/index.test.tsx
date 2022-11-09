import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from 'ui/tests/utils';
import { MsgSend } from '@models';
import Send from '.';

// ==================================
// mocks
// ==================================

jest.mock('@components/name', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Name" {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgSend', () => {
  it('matches snapshot', () => {
    const message = new MsgSend({
      category: 'bank',
      type: 'MsgSend',
      fromAddress: 'fromAddress',
      toAddress: 'toAddress',
      amount: [
        {
          denom: 'udaric',
          amount: '200000000',
        },
      ],
    });
    const component = renderer.create(
      <MockTheme>
        <Send message={message} />
      </MockTheme>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
