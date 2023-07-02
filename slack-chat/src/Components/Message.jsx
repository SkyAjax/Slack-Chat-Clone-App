const Message = (props) => {
  const { message } = props;
  const { body, username } = message;
  return (
    <div className="text-break mb-2">
      <b>{`${username}: `}</b>
      <span>{body}</span>
    </div>
  );
};

export default Message;
