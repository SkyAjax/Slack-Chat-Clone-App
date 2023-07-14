import { useEffect, useRef, useState } from 'react';
import {
  FormControl, FormGroup, Button, Modal, FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { selectors as channelSelectors, actions as channelActions } from '../../slices/channelsSlice';
import toast from '../../toast';
import socket from '../../socket';
import { getChannelNameSchema } from '../../yup';

const AddChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const { onHide } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsNames = useSelector(channelSelectors.selectAll).map((channel) => channel.name);

  const NameSchema = getChannelNameSchema(channelsNames);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: (values) => {
      setDisable(true);
      socket.emit('newChannel', { name: values.body }, (response) => {
        const { data, status } = response;
        if (status === 'ok') {
          dispatch(channelActions.setActiveChannel(data));
          setDisable(false);
          onHide();
          return toast('success', 'addChannel');
        }
        return setDisable(false);
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
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
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
              id="body"
              name="body"
              isInvalid={!!formik.errors.body}
            />
            <FormLabel className="visually-hidden" htmlFor="body">{t('modals.channelName')}</FormLabel>
            <FormControl.Feedback type="invalid">{formik.errors.body}</FormControl.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={disabled}>
            {t('buttons.send')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddChannel;
