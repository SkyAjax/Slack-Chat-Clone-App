import { Formik } from 'formik';
import { Button, Form, InputGroup } from 'react-bootstrap';

const MessageInput = () => (
  <Formik
    initialValues={{
      message: '',
    }}
    onSubmit={(values) => {
      console.log(values.message);
    }}
  >
    {({
      handleSubmit, handleChange, values,
    }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <InputGroup size="lg" className="mb-3">
          <Form.Control
            name="message"
            type="text"
            placeholder="Type message..."
            value={values.message}
            onChange={handleChange}
            autoFocus
          />
          <Button variant="outline-secondary" type="submit">
            Send
          </Button>
        </InputGroup>
      </Form>
    )}
  </Formik>
);

export default MessageInput;
