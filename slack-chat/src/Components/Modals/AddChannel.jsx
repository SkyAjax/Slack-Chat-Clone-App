import { useEffect, useRef, useState } from 'react';
import {
  FormControl, FormGroup, Button, Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { selectors as channelSelectors } from '../../slices/channelsSlice';
import socket from '../../socket';

const AddChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const { onHide } = props;
  // const dispatch = useDispatch();
  const channelsNames = useSelector(channelSelectors.selectAll).map((channel) => channel.name);

  const NameSchema = Yup.object().shape({
    body: Yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  });

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values) => {
      socket.emit('newChannel', { name: values.body }, (response) => {
        const { status } = response;
        setDisable(true);
        if (status === 'ok') {
          setDisable(false);
          return onHide();
        }
        setDisable(false);
        return onHide();
      });
    },
    validationSchema: NameSchema,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>Add Channel</Modal.Title>
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
              id="channelNameInput"
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
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddChannel;
