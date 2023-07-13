import React, { useRef } from 'react';
import { Formik } from 'formik';
import {
  Form, Button, Container, Card, Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks';
import { SignInSchema } from '../yup';

const Login = () => {
  const inputRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1 className="mb-4">{t('buttons.signIn')}</h1>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={SignInSchema}
                onSubmit={async (values, actions) => {
                  try {
                    const response = await axios.post(routes.loginPath(), values);
                    localStorage.setItem('userId', JSON.stringify(response.data));
                    auth.setUsername(response.data.username);
                    auth.logIn();
                    navigate('/');
                  } catch (e) {
                    actions.setErrors({
                      username: ' ',
                      password: t('errors.wrongCredentials'),
                    });
                    inputRef.current.focus();
                    inputRef.current.select();
                    throw e;
                  }
                }}
              >
                {({
                  handleSubmit, handleChange, values, errors, touched,
                }) => (

                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                        ref={inputRef}
                        name="username"
                        type="text"
                        placeholder={t('auth.username')}
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={touched.username && !!errors.username}
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.username)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder={t('auth.password')}
                        value={values.password}
                        onChange={handleChange}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.password)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      {t('buttons.signIn')}
                    </Button>
                  </Form>

                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('auth.signUpMessage')}
                <span>
                  {' '}
                  <Card.Link>
                    <Link to="/signup">{t('buttons.signUp')}</Link>
                  </Card.Link>
                </span>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Row>
    </Container>
  );
};

export default Login;
