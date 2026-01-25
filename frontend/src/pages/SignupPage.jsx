import { Formik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { signupUser } from "../api/auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/slices/authSlice.js";
import { signupSchema } from "../schemas/validationSchema.js";
import Alert from "react-bootstrap/Alert";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Регистрация</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signupSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);
          try {
            const data = await signupUser(values.username, values.password);
            dispatch(setCredentials({
              token: data.token,
              username: values.username,
            }));
            navigate("/");
          } catch (err) {
            if (err.response.status === 409) {
              setStatus('Такой пользователь уже существует');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, handleBlur, values, touched, errors, status  }) => (
          <Form onSubmit={handleSubmit}>
            {status && (
              <Alert variant="danger" className="mb-3">
                {status}
              </Alert>
            )}
            <FloatingLabel
              controlId="floatingUsername"
              label="Имя пользователя"
              className="mb-3"
            >
              <Form.Control
                name="username"
                type="text"
                placeholder="от 3 до 20 символов"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type='invalid'>
                {String(errors.username)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Ваш пароль"
              className="mb-3"
            >
              <Form.Control
                name="password"
                type="password"
                placeholder="Не менее 6 символов"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {String(errors.password)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingCheckPassword"
              label="Повторите пароль"
              className="mb-3"
            >
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="пароли должны совпадать"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {String(errors.confirmPassword)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button
              variant="outline-primary"
              type="submit"
              disabled={isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;