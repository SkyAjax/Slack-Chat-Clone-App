import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectByChannelIds, selectors } from '../slices/messagesSlice';
import { selectors as channelSelectors } from '../slices/channelsSlice';
import Message from './Message';
import MessageInput from './MessageInput';

const Messages = () => {
  // const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const channels = useSelector(channelSelectors.selectAll);
  console.log(selectors, channels);
  const activeChannel = channels.find((channel) => channel.id === currentChannelId);
  const { name = 2, id } = activeChannel;
  const messages = useSelector(selectByChannelIds(id));

  return (
    <>
      <Row className="mb-4 shadow-sm small p-3 bg-light">
        <b>{`# ${name}`}</b>
        <span className="text-muted">{`${messages.length} сообщений`}</span>
      </Row>
      <Row className="overflow-auto px-5">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </Row>
      <Row className="mt-auto px-5 py-3">
        <MessageInput />
      </Row>
    </>
  );
};

export default Messages;
