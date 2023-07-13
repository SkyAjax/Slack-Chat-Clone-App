import { useEffect, useRef, useState } from 'react';
import {
  FormControl, FormGroup, Button, Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { selectors as channelSelectors } from '../../slices/channelsSlice';
import socket from '../../socket';
import toast from '../../toast';

const RenameChannel = (props) => {
  const [disabled, setDisable] = useState(false);
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { onHide, modalInfo } = props;
  const { id, name } = modalInfo.item;
  // const dispatch = useDispatch();
  const channelsNames = useSelector(channelSelectors.selectAll).map((channel) => channel.name);

  const NameSchema = Yup.object().shape({
    body: Yup.string()
      .min(3)
      .max(20)
      .required()
      .notOneOf(channelsNames),
  });

  const formik = useFormik({
    initialValues: { body: name },
    onSubmit: (values) => {
      setDisable(true);
      socket.emit('renameChannel', { id, name: values.body }, (response) => {
        const { status } = response;
        if (status === 'ok') {
          setDisable(false);
          onHide();
          return toast('success', 'renameChannel');
        }
        setDisable(false);
        return onHide();
      });
    },
    validationSchema: NameSchema,
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select();
    });
  }, []);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>{t('modals.renameChannel')}</Modal.Title>
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
              id="channelRenameInput"
              name="body"
              isInvalid={!!formik.errors.body}
            />
            <FormControl.Feedback type="invalid">{formik.errors.body}</FormControl.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={disabled} onClick={() => onHide()}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={disabled}>
            {t('buttons.rename')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default RenameChannel;
