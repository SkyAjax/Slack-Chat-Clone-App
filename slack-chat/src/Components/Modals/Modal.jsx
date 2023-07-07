import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getModal from './index';
import { actions as modalActions } from '../../slices/modalsSlice';

// BEGIN (write your solution here)
const Modal = () => {
  const modalInfo = useSelector((state) => state.modals);
  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(modalActions.setModal({ type: null, item: null }));
  };

  const renderModal = (modal, hide) => {
    if (!modal.type) {
      return null;
    }

    const Component = getModal(modal.type);
    return <Component modalInfo={modal} onHide={hide} />;
  };

  return (
    <>
      {renderModal(modalInfo, hideModal)}
    </>
  );
};

export default Modal;
// END
