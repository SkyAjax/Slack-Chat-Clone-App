import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, InputGroup } from 'react-bootstrap';
import useAuth from '../hooks';
import socket from '../socket';

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [disabledInput, setDisable] = useState(true);
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const auth = useAuth();
  const inputEl = useRef(null);

  useEffect(() => {
    setDisable(!messageText.trim());
  }, [messageText]);

  const handleSubmit = (e) => {
    console.log(socket);
    e.preventDefault();
    setDisable(true);
    const { username } = auth;
    socket.emit('newMessage', { body: messageText, channelId, username }, (response) => {
      const { status } = response;
      if (status === 'ok') {
        setMessageText('');
        setDisable(false);
        return inputEl.current.focus();
      }
      setDisable(false);
      inputEl.current.focus();
      return inputEl.current.select();
    });
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <InputGroup size="lg" className="mb-3">
        <Form.Control
          ref={inputEl}
          name="message"
          type="text"
          placeholder="Type message..."
          value={messageText}
          onChange={handleChange}
          autoFocus
        />
        <Button variant="outline-secondary" type="submit" disabled={disabledInput}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
