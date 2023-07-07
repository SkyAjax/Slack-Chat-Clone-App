import { useEffect, useRef } from 'react';
import {
  FormControl, FormGroup, Button, Modal,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { selectors as channelSelectors } from '../../slices/channelsSlice';
// import socket from '../../socket';

const TestRename = (props) => {
//   const [disabled, setDisable] = useState(false);
  const { onHide } = props;
  //   const dispatch = useDispatch();
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
      console.log(values);
    },
    validationSchema: NameSchema,
  });

  const inputRef = useRef(null);
  useEffect(() => {
    console.log('pop');
    console.log(inputRef.current);
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => onHide()}>
        <Modal.Title>Add Channel</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FormGroup>
            <FormControl
              required
              type="text"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.body}
              name="body"
            />
            <FormControl.Feedback type="invalid">{formik.errors.body}</FormControl.Feedback>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => onHide()}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default TestRename;
