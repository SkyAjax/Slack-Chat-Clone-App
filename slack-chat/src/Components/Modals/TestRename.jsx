import { useEffect, useRef } from 'react';
// import socket from '../../socket';

const TestRename = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    console.log('pop');
    console.log(inputRef.current);
    inputRef.current.focus();
  }, []);

  return (
    <input ref={inputRef} />
  );
};

export default TestRename;
