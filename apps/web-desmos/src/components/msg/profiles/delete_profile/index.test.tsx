import React from 'react';
import renderer from 'react-test-renderer';
import { MockTheme } from 'ui/tests/utils';
import MsgDeleteProfile from '@models/desmos/msg/profiles/msg_delete_profile';
import DeleteProfile from '.';

// ==================================
// mocks
// ==================================

jest.mock('@components/name', () => (props: JSX.IntrinsicElements['div']) => (
  <div id="Name" {...props} />
));

// ==================================
// unit tests
// ==================================
describe('screen: TransactionDetails/DeleteProfile', () => {
  it('matches snapshot', () => {
    const message = new MsgDeleteProfile({
      category: 'profiles',
      type: 'MsgDeleteProfile',
      creator: 'creator',
    });
    const component = renderer.create(
      <MockTheme>
        <DeleteProfile message={message} />
      </MockTheme>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
