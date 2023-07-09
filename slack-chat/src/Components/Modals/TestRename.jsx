import { useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
// import socket from '../../socket';

const TestRename = () => {
  const inputRef = useRef(null);
  console.log('ttt');
  useEffect(() => {
    console.log('pop');
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input ref={inputRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Rename
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TestRename;
