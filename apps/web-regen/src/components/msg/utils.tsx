import Tag from 'ui/components/tag';
import * as models from '@models';
import * as modelsCustom from '@models/regen';
import * as COMPONENTS from 'ui/components/msg';
import * as R from 'ramda';
import React from 'react';

const MODELS = { ...models, ...modelsCustom };

const getDataByType = (type: string) => {
  // =====================================
  // DO NOT UPDATE IF THIS IS A FORK.
  // ONLY COSMOS SDK DEFAULT MESSAGES HERE.
  // Please use `customTypeToModel` below for custom message types
  // =====================================
  const defaultTypeToModel = {
    // ========================
    // staking
    // ========================
    '/cosmos.staking.v1beta1.MsgDelegate': {
      model: MODELS.MsgDelegate,
      content: COMPONENTS.Delegate,
      tagTheme: 'one',
      tagDisplay: 'txDelegateLabel',
    },
    '/cosmos.staking.v1beta1.MsgBeginRedelegate': {
      model: MODELS.MsgRedelegate,
      content: COMPONENTS.Redelegate,
      tagTheme: 'one',
      tagDisplay: 'txRedelegateLabel',
    },
    '/cosmos.staking.v1beta1.MsgUndelegate': {
      model: MODELS.MsgUndelegate,
      content: COMPONENTS.Undelegate,
      tagTheme: 'one',
      tagDisplay: 'txUndelegateLabel',
    },
    '/cosmos.staking.v1beta1.MsgCreateValidator': {
      model: MODELS.MsgCreateValidator,
      content: COMPONENTS.CreateValidator,
      tagTheme: 'one',
      tagDisplay: 'txCreateValidatorLabel',
    },
    '/cosmos.staking.v1beta1.MsgEditValidator': {
      model: MODELS.MsgEditValidator,
      content: COMPONENTS.EditValidator,
      tagTheme: 'one',
      tagDisplay: 'txEditValidatorLabel',
    },
    // ========================
    // bank
    // ========================
    '/cosmos.bank.v1beta1.MsgSend': {
      model: MODELS.MsgSend,
      content: COMPONENTS.Send,
      tagTheme: 'two',
      tagDisplay: 'txSendLabel',
    },
    '/cosmos.bank.v1beta1.MsgMultiSend': {
      model: MODELS.MsgMultiSend,
      content: COMPONENTS.Multisend,
      tagTheme: 'two',
      tagDisplay: 'txMultisendLabel',
    },
    // ========================
    // crisis
    // ========================
    '/cosmos.crisis.v1beta1.MsgVerifyInvariant': {
      model: MODELS.MsgVerifyInvariant,
      content: COMPONENTS.VerifyInvariant,
      tagTheme: 'three',
      tagDisplay: 'txVerifyInvariantLabel',
    },
    // ========================
    // slashing
    // ========================
    '/cosmos.slashing.v1beta1.MsgUnjail': {
      model: MODELS.MsgUnjail,
      content: COMPONENTS.Unjail,
      tagTheme: 'five',
      tagDisplay: 'txUnjailLabel',
    },
    // ========================
    // distribution
    // ========================
    '/cosmos.distribution.v1beta1.MsgFundCommunityPool': {
      model: MODELS.MsgFundCommunityPool,
      content: COMPONENTS.Fund,
      tagTheme: 'six',
      tagDisplay: 'txFundLabel',
    },
    '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress': {
      model: MODELS.MsgSetWithdrawAddress,
      content: COMPONENTS.SetWithdrawalAddress,
      tagTheme: 'six',
      tagDisplay: 'txsetRewardAddressLabel',
    },
    '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward': {
      model: MODELS.MsgWithdrawDelegatorReward,
      content: COMPONENTS.WithdrawReward,
      tagTheme: 'six',
      tagDisplay: 'txWithdrawRewardLabel',
    },
    '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission': {
      model: MODELS.MsgWithdrawValidatorCommission,
      content: COMPONENTS.WithdrawCommission,
      tagTheme: 'six',
      tagDisplay: 'txWithdrawCommissionLabel',
    },
    // ========================
    // governance
    // ========================
    '/cosmos.gov.v1beta1.MsgDeposit': {
      model: MODELS.MsgDeposit,
      content: COMPONENTS.DepositProposal,
      tagTheme: 'seven',
      tagDisplay: 'txDepositLabel',
    },
    '/cosmos.gov.v1beta1.MsgVote': {
      model: MODELS.MsgVote,
      content: COMPONENTS.Vote,
      tagTheme: 'seven',
      tagDisplay: 'txVoteLabel',
    },
    '/cosmos.gov.v1beta1.MsgSubmitProposal': {
      model: MODELS.MsgSubmitProposal,
      content: COMPONENTS.SubmitProposal,
      tagTheme: 'seven',
      tagDisplay: 'txSubmitProposalLabel',
    },
    // ========================
    // ibc client
    // ========================
    '/ibc.core.client.v1.MsgCreateClient': {
      model: MODELS.MsgCreateClient,
      content: COMPONENTS.CreateClient,
      tagTheme: 'nine',
      tagDisplay: 'txCreateClientLabel',
    },
    '/ibc.core.client.v1.MsgUpdateClient': {
      model: MODELS.MsgUpdateClient,
      content: COMPONENTS.UpdateClient,
      tagTheme: 'nine',
      tagDisplay: 'txUpdateClientLabel',
    },
    '/ibc.core.client.v1.MsgUpgradeClient': {
      model: MODELS.MsgUpgradeClient,
      content: COMPONENTS.UpgradeClient,
      tagTheme: 'nine',
      tagDisplay: 'txUpgradeClientLabel',
    },
    '/ibc.core.client.v1.MsgSubmitMisbehaviour': {
      model: MODELS.MsgSubmitMisbehaviour,
      content: COMPONENTS.SubmitMisbehaviour,
      tagTheme: 'nine',
      tagDisplay: 'txSubmitMisbehaviourLabel',
    },
    '/ibc.core.client.v1.Height': {
      model: MODELS.MsgHeight,
      content: COMPONENTS.Height,
      tagTheme: 'nine',
      tagDisplay: 'txHeightLabel',
    },
    // ========================
    // ibc channel
    // ========================
    '/ibc.core.channel.v1.MsgRecvPacket': {
      model: MODELS.MsgReceivePacket,
      content: COMPONENTS.ReceivePacket,
      tagTheme: 'nine',
      tagDisplay: 'txRecvPacketLabel',
    },
    '/ibc.core.channel.v1.Channel': {
      model: MODELS.MsgChannel,
      content: COMPONENTS.Channel,
      tagTheme: 'nine',
      tagDisplay: 'txChannelLabel',
    },
    '/ibc.core.channel.v1.Counterparty': {
      model: MODELS.MsgCounterpartyChannel,
      content: COMPONENTS.CounterpartyChannel,
      tagTheme: 'nine',
      tagDisplay: 'txCounterpartyLabel',
    },
    '/ibc.core.channel.v1.Packet': {
      model: MODELS.MsgPacket,
      content: COMPONENTS.Packet,
      tagTheme: 'nine',
      tagDisplay: 'txPacketLabel',
    },
    '/ibc.core.channel.v1.MsgAcknowledgement': {
      model: MODELS.MsgAcknowledgement,
      content: COMPONENTS.Acknowledgement,
      tagTheme: 'nine',
      tagDisplay: 'txAcknowledgementLabel',
    },
    '/ibc.core.channel.v1.MsgChannelCloseConfirm': {
      model: MODELS.MsgChannelCloseConfirm,
      content: COMPONENTS.ChannelCloseConfirm,
      tagTheme: 'nine',
      tagDisplay: 'txChannelCloseConfirmLabel',
    },
    '/ibc.core.channel.v1.MsgChannelCloseInit': {
      model: MODELS.MsgChannelCloseInit,
      content: COMPONENTS.ChannelCloseInit,
      tagTheme: 'nine',
      tagDisplay: 'txChannelCloseInitLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenAck': {
      model: MODELS.MsgChannelOpenAck,
      content: COMPONENTS.ChannelOpenAck,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenAckLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenConfirm': {
      model: MODELS.MsgChannelOpenConfirm,
      content: COMPONENTS.ChannelOpenConfirm,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenConfirmLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenInit': {
      model: MODELS.MsgChannelOpenInit,
      content: COMPONENTS.ChannelOpenInit,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenInitLabel',
    },
    '/ibc.core.channel.v1.MsgChannelOpenTry': {
      model: MODELS.MsgChannelOpenTry,
      content: COMPONENTS.ChannelOpenTry,
      tagTheme: 'nine',
      tagDisplay: 'txChannelOpenTryLabel',
    },
    '/ibc.core.channel.v1.MsgTimeout': {
      model: MODELS.MsgTimeout,
      content: COMPONENTS.Timeout,
      tagTheme: 'nine',
      tagDisplay: 'txTimeoutLabel',
    },
    '/ibc.core.channel.v1.MsgTimeoutOnClose': {
      model: MODELS.MsgTimeoutOnClose,
      content: COMPONENTS.TimeoutOnClose,
      tagTheme: 'nine',
      tagDisplay: 'txTimeoutOnCloseLabel',
    },
    // ========================
    // ibc connection
    // ========================
    '/ibc.core.connection.v1.MsgConnectionOpenAck': {
      model: MODELS.MsgConnectionOpenAck,
      content: COMPONENTS.ConnectionOpenAck,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenAckLabel',
    },
    '/ibc.core.connection.v1.MsgConnectionOpenConfirm': {
      model: MODELS.MsgConnectionOpenConfirm,
      content: COMPONENTS.ConnectionOpenConfirm,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenConfirmLabel',
    },
    '/ibc.core.connection.v1.MsgConnectionOpenInit': {
      model: MODELS.MsgConnectionOpenInit,
      content: COMPONENTS.ConnectionOpenInit,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenInitLabel',
    },
    '/ibc.core.connection.v1.MsgConnectionOpenTry': {
      model: MODELS.MsgConnectionOpenTry,
      content: COMPONENTS.ConnectionOpenTry,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionOpenTryLabel',
    },
    '/ibc.core.connection.v1.ConnectionEnd': {
      model: MODELS.MsgConnectionEnd,
      content: COMPONENTS.ConnectionEnd,
      tagTheme: 'nine',
      tagDisplay: 'txConnectionEndLabel',
    },
    '/ibc.core.connection.v1.Counterparty': {
      model: MODELS.MsgCounterpartyConnection,
      content: COMPONENTS.CounterpartyConnection,
      tagTheme: 'nine',
      tagDisplay: 'txCounterpartyLabel',
    },
    '/ibc.core.connection.v1.Version': {
      model: MODELS.MsgVersion,
      content: COMPONENTS.Version,
      tagTheme: 'nine',
      tagDisplay: 'txVersionLabel',
    },
    // ========================
    // ibc transfer
    // ========================
    '/ibc.applications.transfer.v1.MsgTransfer': {
      model: MODELS.MsgTransfer,
      content: COMPONENTS.Transfer,
      tagTheme: 'ten',
      tagDisplay: 'txTransferLabel',
    },
    // ========================
    // authz
    // ========================
    '/cosmos.authz.v1beta1.MsgGrant': {
      model: MODELS.MsgGrant,
      content: COMPONENTS.Grant,
      tagTheme: 'thirteen',
      tagDisplay: 'MsgGrant',
    },
    '/cosmos.authz.v1beta1.MsgRevoke': {
      model: MODELS.MsgRevoke,
      content: COMPONENTS.Revoke,
      tagTheme: 'thirteen',
      tagDisplay: 'MsgRevoke',
    },
    // ========================
    // feegrant
    // ========================
    '/cosmos.feegrant.v1beta1.MsgGrantAllowance': {
      model: MODELS.MsgGrantAllowance,
      content: COMPONENTS.GrantAllowance,
      tagTheme: 'fourteen',
      tagDisplay: 'MsgGrantAllowance',
    },
    '/cosmos.feegrant.v1beta1.MsgRevokeAllowance': {
      model: MODELS.MsgRevokeAllowance,
      content: COMPONENTS.RevokeAllowance,
      tagTheme: 'fourteen',
      tagDisplay: 'MsgRevokeAllowance',
    },
    // ========================
    // vesting
    // ========================
    '/cosmos.vesting.v1beta1.MsgCreateVestingAccount': {
      model: MODELS.MsgCreateVestingAccount,
      content: COMPONENTS.CreateVestingAccount,
      tagTheme: 'fifteen',
      tagDisplay: 'MsgCreateVestingAccount',
    },
    '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount': {
      model: MODELS.MsgCreatePeriodicVestingAccount,
      content: COMPONENTS.CreatePeriodicVestingAccount,
      tagTheme: 'fifteen',
      tagDisplay: 'MsgCreatePeriodicVestingAccount',
    },
  };

  // =====================================
  // Update your chain's message types here
  // =====================================
  const customTypeToModel = {
    // ========================
    // data
    // ========================
    '/regen.data.v1alpha1.MsgAnchorDataRequest': {
      model: MODELS.MsgAnchorDataRequest,
      content: COMPONENTS.AnchorDataRequest,
      tagTheme: 'four',
      tagDisplay: 'MsgAnchorDataRequest',
    },
    '/regen.data.v1alpha1.MsgSignDataRequest': {
      model: MODELS.MsgSignDataRequest,
      content: COMPONENTS.SignDataRequest,
      tagTheme: 'four',
      tagDisplay: 'MsgSignDataRequest',
    },
    '/regen.data.v1alpha1.MsgStoreRawDataRequest': {
      model: MODELS.MsgStoreRawDataRequest,
      content: COMPONENTS.StoreRawDataRequest,
      tagTheme: 'four',
      tagDisplay: 'MsgStoreRawDataRequest',
    },
    // ========================
    // ecocredit
    // ========================
    '/regen.ecocredit.v1alpha1.MsgCreateClassRequest': {
      model: MODELS.MsgCreateClassRequest,
      content: COMPONENTS.CreateClassRequest,
      tagTheme: 'five',
      tagDisplay: 'MsgCreateClassRequest',
    },
    '/regen.ecocredit.v1alpha1.MsgCreateBatchRequest': {
      model: MODELS.MsgCreateBatchRequest,
      content: COMPONENTS.CreateBatchRequest,
      tagTheme: 'five',
      tagDisplay: 'MsgCreateBatchRequest',
    },
    '/regen.ecocredit.v1alpha1.MsgSendRequest': {
      model: MODELS.MsgSendRequest,
      content: COMPONENTS.SendRequest,
      tagTheme: 'five',
      tagDisplay: 'MsgSendRequest',
    },
    '/regen.ecocredit.v1alpha1.MsgRetireRequest': {
      model: MODELS.MsgRetireRequest,
      content: COMPONENTS.RetireRequest,
      tagTheme: 'five',
      tagDisplay: 'MsgRetireRequest',
    },
    // ========================
    // group
    // ========================
    '/regen.group.v1alpha1.MsgCreateGroupAccountRequest': {
      model: MODELS.MsgCreateGroupAccountRequest,
      content: COMPONENTS.CreateGroupAccountRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgCreateGroupAccountRequest',
    },
    '/regen.group.v1alpha1.MsgCreateGroupRequest': {
      model: MODELS.MsgCreateGroupRequest,
      content: COMPONENTS.CreateGroupRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgCreateGroupRequest',
    },
    '/regen.group.v1alpha1.MsgCreateProposalRequest': {
      model: MODELS.MsgCreateProposalRequest,
      content: COMPONENTS.CreateProposalRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgCreateProposalRequest',
    },
    '/regen.group.v1alpha1.MsgExecRequest': {
      model: MODELS.MsgExecRequest,
      content: COMPONENTS.ExecRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgExecRequest',
    },
    '/regen.group.v1alpha1.MsgUpdateGroupAccountAdminRequest': {
      model: MODELS.MsgUpdateGroupAccountAdminRequest,
      content: COMPONENTS.UpdateGroupAccountAdminRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgUpdateGroupAccountAdminRequest',
    },
    '/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicyRequest': {
      model: MODELS.MsgUpdateGroupAccountDecisionPolicyRequest,
      content: COMPONENTS.UpdateGroupAccountDecisionPolicyRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgUpdateGroupAccountDecisionPolicyRequest',
    },
    '/regen.group.v1alpha1.MsgUpdateGroupAccountMetadataRequest': {
      model: MODELS.MsgUpdateGroupAccountMetadataRequest,
      content: COMPONENTS.UpdateGroupAccountMetadataRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgUpdateGroupAccountMetadataRequest',
    },
    '/regen.group.v1alpha1.MsgUpdateGroupAdminRequest': {
      model: MODELS.MsgUpdateGroupAdminRequest,
      content: COMPONENTS.UpdateGroupAdminRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgUpdateGroupAdminRequest',
    },
    '/regen.group.v1alpha1.MsgUpdateGroupMembersRequest': {
      model: MODELS.MsgUpdateGroupMembersRequest,
      content: COMPONENTS.UpdateGroupMembersRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgUpdateGroupMembersRequest',
    },
    '/regen.group.v1alpha1.MsgUpdateGroupMetadataRequest': {
      model: MODELS.MsgUpdateGroupMetadataRequest,
      content: COMPONENTS.UpdateGroupMetadataRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgUpdateGroupMetadataRequest',
    },
    '/regen.group.v1alpha1.MsgVoteRequest': {
      model: MODELS.MsgVoteRequest,
      content: COMPONENTS.VoteRequest,
      tagTheme: 'eight',
      tagDisplay: 'MsgVoteRequest',
    },
  };

  if (
    ((_): _ is keyof typeof defaultTypeToModel => _ in defaultTypeToModel)(type) &&
    defaultTypeToModel[type]
  )
    return defaultTypeToModel[type];

  if (
    ((_): _ is keyof typeof customTypeToModel => _ in customTypeToModel)(type) &&
    customTypeToModel[type]
  )
    return customTypeToModel[type];

  return null;
};

/**
 * Helper function that helps get model by type
 * @param type Model type
 */
export const getMessageModelByType = (type: string) => {
  const data = getDataByType(type);
  if (data) {
    return data.model;
  }

  return MODELS.MsgUnknown;
};

/**
 * Helper function to correctly display the correct UI
 * @param type Model type
 */
export const getMessageByType = (message: any, viewRaw: boolean, t: any) => {
  const { type } = message;
  type dataType = ReturnType<typeof getDataByType>;
  type resultType = {
    content: dataType extends { content: unknown }
      ? dataType['content']
      : typeof COMPONENTS.Unknown;
    tagDisplay: dataType extends { tagDisplay: unknown }
      ? dataType['tagDisplay']
      : 'txUnknownLabel';
    tagTheme: dataType extends { tagTheme: unknown } ? dataType['tagTheme'] : 'zero';
  };
  let results: resultType = {
    content: COMPONENTS.Unknown,
    tagDisplay: 'txUnknownLabel',
    tagTheme: 'zero',
  };

  const data = getDataByType(type);

  if (data) {
    results = {
      content: data?.content as resultType['content'],
      tagDisplay: data.tagDisplay as resultType['tagDisplay'],
      tagTheme: data.tagTheme as resultType['tagTheme'],
    };
  }

  // If user asks to view the raw data
  if (viewRaw || !results.content) {
    results.content = COMPONENTS.Unknown;
  }

  return {
    type: <Tag value={t(`message_labels:${results.tagDisplay}`)} theme={results.tagTheme} />,
    message: <results.content message={message as any} />,
  };
};

export const convertMsgsToModels = (transaction: any) => {
  const messages = R.pathOr([], ['messages'], transaction).map((msg, i) => {
    const model = getMessageModelByType(msg?.['@type']);
    if (
      model === MODELS.MsgWithdrawDelegatorReward ||
      model === MODELS.MsgWithdrawValidatorCommission
    ) {
      const log = R.pathOr(null, ['logs', i], transaction);
      return model.fromJson(msg, log);
    }
    return model.fromJson(msg);
  });

  return messages;
};
