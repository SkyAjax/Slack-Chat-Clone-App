// import React from 'react';

import {
  Button, ButtonGroup, Dropdown, ListGroupItem,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelActions } from '../slices/channelsSlice';
import { actions as modalActions } from '../slices/modalsSlice';

const Channel = (props) => {
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const { channel } = props;
  const { name, id, removable } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const btnVariant = currentChannelId === id ? 'secondary' : 'light';

  const handleClick = (channelObj) => {
    dispatch(channelActions.setActiveChannel(channelObj));
  };

  const handleRemoveClick = () => {
    dispatch(modalActions.setModal({ type: 'removingChannel', item: channel }));
  };

  const handleRenameClick = () => {
    dispatch(modalActions.setModal({ type: 'renamingChannel', item: channel }));
  };

  const btn = (
    <Button variant={btnVariant} className="w-100 rounded-0 text-start btn shadow-none text-truncate" onClick={() => handleClick(channel)}>
      {`# ${name}`}
    </Button>
  );

  const dropdownBtn = (
    <Dropdown as={ButtonGroup} className="w-100 rounded-0">
      {btn}
      <Dropdown.Toggle split variant={btnVariant} id="dropdown-split-basic" className="rounded-0" />

      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={() => handleRemoveClick()}>{t('buttons.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => handleRenameClick()}>{t('buttons.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <ListGroupItem className="mx-2 p-0">
      {removable ? dropdownBtn : btn}
    </ListGroupItem>
  );
};

export default Channel;
