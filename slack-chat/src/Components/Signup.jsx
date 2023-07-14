/* eslint-disable consistent-return */
import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import {
  Form, Button, Container, Card, Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks';
import { SignUpSchema } from '../yup';

const Signup = () => {
  const [disabled, setDisable] = useState(false);
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
              <h1 className="mb-4">{t('buttons.signUp')}</h1>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values, actions) => {
                  setDisable(true);
                  try {
                    const response = await axios.post(routes.signupPath(), values);
                    console.log(response);
                    localStorage.setItem('userId', JSON.stringify(response.data));
                    auth.setUsername(response.data.username);
                    auth.logIn();
                    navigate('/');
                  } catch (e) {
                    if (e.response.status === 409) {
                      return actions.setErrors({
                        username: t('errors.notUnique'),
                      });
                    }
                    actions.setErrors({
                      username: t('errors.defaultSignUp'),
                    });
                    inputRef.current.focus();
                    inputRef.current.select();
                    throw e;
                  }
                }}
              >
                {({
                  handleSubmit, handleChange, handleBlur, values, errors, touched,
                }) => (
                  <Form
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <Form.Group className="mb-3">
                      <Form.Control
                        ref={inputRef}
                        name="username"
                        type="text"
                        placeholder={t('auth.username')}
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.password)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder={t('auth.confirmPassword')}
                        value={values.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" disabled={disabled}>
                      {t('buttons.signUp')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {t('auth.signInMessage')}
                <span>
                  {' '}
                  <Card.Link>
                    <Link to="/login">{t('buttons.signIn')}</Link>
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

export default Signup;
