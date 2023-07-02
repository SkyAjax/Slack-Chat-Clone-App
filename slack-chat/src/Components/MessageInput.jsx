import { useRef, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import io from 'socket.io-client';
import useAuth from '../hooks';

import routes from '../routes';

const MessageInput = () => {
  const socket = io(routes.usersPath());
  const [messageText, setMessageText] = useState('');
  const auth = useAuth();
  const inputEl = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, channelId } = auth;
    console.log(auth);
    socket.emit('newMessage', { body: messageText, channelId, username }, (response) => {
      console.log(response.status);
    });
    socket.on('newMessage', (payload, callback) => {
      console.log(payload);
      callback({
        status: 'ok',
      });
    });
    setMessageText('');
    inputEl.current.focus();
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
        <Button variant="outline-secondary" type="submit">
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
