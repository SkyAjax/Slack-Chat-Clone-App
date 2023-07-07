import { useEffect, useRef, useState } from 'react';
import {
  FormControl, FormGroup, Button, Modal,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { actions as channelActions, selectors as channelSelectors } from '../../slices/channelsSlice';
import socket from '../../socket';

const RenameChannel = (props) => {
  console.log('wor');
  const [disabled, setDisable] = useState(false);
  const inputRef = useRef(null);
  const { onHide, modalInfo } = props;
  const { id, name } = modalInfo.item;
  const dispatch = useDispatch();
  const channelsNames = useSelector(channelSelectors.selectAll).map((channel) => channel.name);

  const NameSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { body: name },
    onSubmit: (values) => {
      console.log('sending');
      socket.on('renameChannel', (payload) => {
        console.log(payload);
        dispatch(channelActions.renameChannel(
          { id: payload.id, changes: { name: [payload.name] } },
        ));
      });
      socket.emit('renameChannel', { id, name: values.body }, (response) => {
        const { status } = response;
        console.log(status);
        setDisable(true);
        if (status === 'ok') {
          setDisable(false);
          return onHide();
        }
        return setDisable(false);
      });
    },
    validationSchema: NameSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    inputRef.current.focus();
    console.log('rendered');
    return () => {
      console.log('cleaning');
      console.log('good to go');
    };
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              name="body"
              isInvalid={!!formik.errors.body}
            />
            <FormControl.Feedback type="invalid">{formik.errors.body}</FormControl.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={disabled}>
            Rename
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RenameChannel;
