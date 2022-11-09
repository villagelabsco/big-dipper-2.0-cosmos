import React from 'react';
import renderer, { ReactTestRenderer } from 'react-test-renderer';
import { MockTheme, wait } from 'ui/tests/utils';
import { ApolloProvider } from '@apollo/client';
import { createMockClient, createMockSubscription, IMockSubscription, MockApolloClient } from 'mock-apollo-client';
import {
  LatestBlockHeightListenerDocument,
  AverageBlockTimeDocument,
  TokenPriceListenerDocument,
  ActiveValidatorCountDocument,
} from '@graphql/types/general_types';
import DataBlocks from '.';

// ==================================
// mocks
// ==================================
const mockI18n = {
  t: (key: string) => key,
  lang: 'en',
};

const mockLatestBlockHeight = {
  data: {
    height: [
      {
        height: 953992,
      },
    ],
  },
};

const mockAverageBlockTime = jest.fn().mockResolvedValue({
  data: {
    averageBlockTime: [
      {
        averageTime: 6.540624503709312,
      },
    ],
  },
});

const mockTokenPrice = {
  data: {
    tokenPrice: [],
  },
};

const mockActiveValidatorsCount = jest.fn().mockResolvedValue({
  data: {
    activeTotal: {
      aggregate: {
        count: 200,
      },
    },
    inactiveTotal: {
      aggregate: {
        count: 332,
      },
    },
    total: {
      aggregate: {
        count: 532,
      },
    },
  },
});

let mockClient: MockApolloClient;
let mockSubscription: IMockSubscription;
let mockSubscriptionTwo: IMockSubscription;

beforeEach(() => {
  jest.mock('next-translate/useTranslation', () => () => mockI18n);
  jest.mock('./components', () => ({
    SingleBlock: (props: JSX.IntrinsicElements['div']) => <div id="SingleBlock" {...props} />,
  }));
  
  mockClient = createMockClient();
  mockSubscription = createMockSubscription();
  mockSubscriptionTwo = createMockSubscription();

  mockClient.setRequestHandler(LatestBlockHeightListenerDocument, () => mockSubscription);

  mockClient.setRequestHandler(TokenPriceListenerDocument, () => mockSubscriptionTwo);

  mockClient.setRequestHandler(AverageBlockTimeDocument, mockAverageBlockTime);

  mockClient.setRequestHandler(ActiveValidatorCountDocument, mockActiveValidatorsCount);
});

// ==================================
// unit tests
// ==================================
describe('screen: Home/DataBlocks', () => {
  it('matches snapshot', async () => {

    let tree: renderer.ReactTestRendererJSON | renderer.ReactTestRendererJSON[] | null = null;

    renderer.act(() => {
      const component = renderer.create(
        <ApolloProvider client={mockClient}>
          <MockTheme>
            <DataBlocks />
          </MockTheme>
        </ApolloProvider>
      );
      tree = component.toJSON();
    });
    await wait(renderer.act);

    renderer.act(() => {
      mockSubscription.next(mockLatestBlockHeight);
    });

    await wait(renderer.act);

    renderer.act(() => {
      mockSubscriptionTwo.next(mockTokenPrice);
    });

    await wait(renderer.act);

    expect(tree).toMatchSnapshot();
    expect(mockActiveValidatorsCount).toBeCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
