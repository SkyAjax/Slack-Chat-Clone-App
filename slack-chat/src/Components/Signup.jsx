/* eslint-disable consistent-return */
import React, { useRef } from 'react';
import { Formik } from 'formik';
import {
  Form, Button, Container, Card, Row,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import routes from '../routes';
import useAuth from '../hooks';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Минимум 3 буквы')
    .max(20, 'Максимум 20 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязательное поле')
    .min(6, 'Минимум 6 символов'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
});

const Signup = () => {
  const inputRef = useRef(null);
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <Container className="container-fluid h-100">
      <Row className="justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="p-5">
              <h1>Sign Up</h1>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values, actions) => {
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
                        username: 'Такой пользователь уже существует',
                      });
                    }
                    actions.setErrors({
                      username: 'Ошибка регистрации, попробуйте еще раз',
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
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        ref={inputRef}
                        name="username"
                        type="text"
                        placeholder="Username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        value={values.repeatPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                {'Already have an account? '}
                <span>
                  <Card.Link>
                    <Link to="/login">Sign In</Link>
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
