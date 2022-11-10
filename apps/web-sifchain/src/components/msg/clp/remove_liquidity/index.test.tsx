import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from 'ui/tests/utils';
import MsgRemoveLiquidity from '@models/sifchain/msg/clp/msg_remove_liquidity';
import RemoveLiquidity from '.';

// ==================================
// mocks
// ==================================

jest.mock('ui/components/name', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Name" {...props} />
));

jest.mock('next-translate/Trans', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Trans" {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/MsgRemoveLiquidity', () => {
  it('matches snapshot', () => {
    const message = new MsgRemoveLiquidity({
      category: 'bank',
      type: 'MsgRemoveLiquidity',
      signer: 'signer',
      externalAsset: {
        symbol: 'udaric',
      },
    });
    const component = renderer.create(
      <MockTheme>
        <RemoveLiquidity message={message} />
      </MockTheme>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    expect(component.root.findByProps({ id: 'Trans' }).props.i18nKey).toEqual(
      'message_contents:MsgRemoveLiquidity'
    );
    expect(component.root.findByProps({ id: 'Trans' }).props.values.symbol).toEqual('DARIC');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
