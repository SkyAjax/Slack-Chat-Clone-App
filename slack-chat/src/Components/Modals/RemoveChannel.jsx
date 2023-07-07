import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions as channelActions } from '../../slices/channelsSlice';
import socket from '../../socket';

const RemoveChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const { onHide, modalInfo } = props;
  const { item } = modalInfo;
  const dispatch = useDispatch();

  const handleRemove = (channel) => {
    const { id } = channel;
    socket.emit('removeChannel', { id }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        return onHide();
      }
      return setDisable(false);
    });
    socket.on('removeChannel', () => {
      dispatch(channelActions.removeChannel(id));
      dispatch(channelActions.setActiveChannel({ id: 1 }));
    });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>Remove Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
          Cancel
        </Button>
        <Button variant="danger" type="submit" disabled={disabled} onClick={() => handleRemove(item)}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
