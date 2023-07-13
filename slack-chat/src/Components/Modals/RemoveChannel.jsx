import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { useDispatch } from 'react-redux';
// import { actions as channelActions } from '../../slices/channelsSlice';
import socket from '../../socket';

const RemoveChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const { t } = useTranslation();
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;
  // const dispatch = useDispatch();

  const handleRemove = (channel) => {
    setDisable(true);
    const { id } = channel;
    socket.emit('removeChannel', { id }, (response) => {
      const { status } = response;
      return status === 'ok' ? onHide() : setDisable(false);
    });
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>{t('modals.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.confirmMessage')}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" type="submit" disabled={disabled} onClick={() => handleRemove(item)}>
          {t('buttons.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
