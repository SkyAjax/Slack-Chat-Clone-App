import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useApi, useAuth } from '../hooks';

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [disabledInput, setDisable] = useState(true);
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const auth = useAuth();
  const api = useApi();
  const inputEl = useRef(null);

  useEffect(() => {
    setDisable(!messageText.trim());
  }, [messageText]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisable(true);
    const { username } = auth;
    api.newMessage({ body: messageText, channelId, username }, (response) => {
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
          aria-label={t('messages.newMessage')}
          placeholder={t('messages.messageInput')}
          value={messageText}
          onChange={handleChange}
          autoFocus
        />
        <Button variant="outline-secondary" type="submit" disabled={disabledInput}>
          {t('buttons.send')}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageInput;
