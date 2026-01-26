import { Formik } from 'formik';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { signupUser } from "../api/auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../store/slices/authSlice.js";
import { signupSchema } from "../schemas/validationSchema.js";
import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('auth.signup.title')}</h1>
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
              setStatus('auth.signup.accountExists');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, handleSubmit, handleChange, handleBlur, values, touched, errors, status }) => (
          <Form onSubmit={handleSubmit}>
            {status && (
              <Alert variant="danger" className="mb-3">
                {t(status)}
              </Alert>
            )}
            <FloatingLabel
              controlId="floatingUsername"
              label={t('auth.signup.username')}
              className="mb-3"
            >
              <Form.Control
                name="username"
                type="text"
                placeholder={t('auth.signup.placeholders.username')}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type='invalid'>
                {t(errors.username)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label={t('auth.signup.password')}
              className="mb-3"
            >
              <Form.Control
                name="password"
                type="password"
                placeholder={t('auth.signup.placeholders.password')}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {t(errors.password)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingCheckPassword"
              label={t('auth.signup.confirmPassword')}
              className="mb-3"
            >
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder={t('auth.signup.placeholders.confirmPassword')}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
              />
              <Form.Control.Feedback type='invalid'>
                {t(errors.confirmPassword)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button
              variant="outline-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {t('auth.signup.submit')}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;