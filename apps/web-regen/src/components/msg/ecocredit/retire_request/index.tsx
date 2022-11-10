import React from 'react';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import Name from 'ui/components/name';
import MsgRetireRequest from '@models/regen/msg/ecocredit/msg_retire_request';
import { useProfileRecoil } from '@recoil/profiles';

const RetireRequest = (props: { message: MsgRetireRequest }) => {
  const { message } = props;

  const holder = useProfileRecoil(message.holder);
  const holderMoniker = holder ? holder?.name : message.holder;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:MsgRetireRequest"
        components={[<Name address={message.holder} name={holderMoniker} />]}
      />
    </Typography>
  );
};

export default RetireRequest;
