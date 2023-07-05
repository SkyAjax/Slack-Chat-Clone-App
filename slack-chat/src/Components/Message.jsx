import { useEffect, useRef } from 'react';

const Message = (props) => {
  const { message } = props;
  const { body, username } = message;
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView();
  });

  return (
    <div ref={divRef} className="text-break mb-2">
      <b>{`${username}: `}</b>
      <span>{body}</span>
    </div>
  );
};

export default Message;
