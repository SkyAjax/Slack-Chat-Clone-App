import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useApi, useAuth } from '../hooks';

const MessageInput = () => {
  const [messageText, setMessageText] = useState('');
  const [disabledInput, setDisable] = useState(!messageText.trim());
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channels.currentChannelId);
  const auth = useAuth();
  const api = useApi();
  const inputEl = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisable(true);
    const { username } = auth;
    const response = await api.newMessage({ body: messageText, channelId, username });
    const { status } = response;
    if (status === 'ok') {
      setMessageText('');
      setDisable(true);
      return inputEl.current.focus();
    }
    setDisable(false);
    inputEl.current.focus();
    return inputEl.current.select();
  };

  const handleChange = (e) => {
    setMessageText(e.target.value);
    setDisable(!e.target.value.trim());
  };

  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)}>
      <InputGroup size="lg" className="mb-3">
        <Form.Control
          ref={inputEl}
          name="message"
          type="text"
          aria-label={t('messages.newMessage')}
          placeholder={t('messages.messageInput')}
          value={messageText}
          onChange={(e) => handleChange(e)}
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
