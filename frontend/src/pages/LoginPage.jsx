import { Formik, Form as FormikForm, Field } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate, Navigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/slices/authSlice.js";
import { loginSchema } from "../schemas/validationSchema.js";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const { t } = useTranslation();

  if (isAuthenticated) {
    return <Navigate to={`/`} />;
  }

  return (
    <div>
      <h1>{t('auth.login.title')}</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          setStatus(null);
          try {
            const data = await loginUser(values.username, values.password);
            dispatch(setCredentials({
              token: data.token,
              username: values.username,
            }));
            navigate("/");
          } catch (err) {
            if (err.response.status === 401) {
              setStatus('auth.login.authFailed')
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched, status }) => (
          <FormikForm>
            {status && (
              <Alert variant="danger" className="mb-3">
                {t(status)}
              </Alert>
            )}
            <FloatingLabel
              controlId="floatingUsername"
              label={t('auth.login.username')}
              className="mb-3"
            >
              <Form.Control
                as={Field}
                name="username"
                type="text"
                placeholder={t('auth.login.placeholders.username')}
                isInvalid={touched.username && !!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {t(errors.username)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label={t('auth.login.password')}
              className="mb-3"
            >
              <Form.Control
                as={Field}
                name="password"
                type="password"
                placeholder={t('auth.login.placeholders.password')}
                isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {t(errors.password)}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button
              variant="outline-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {t('auth.login.submit')}
            </Button>
          </FormikForm>
        )}
      </Formik>
      <div>
        <div className='text-center'>
          <span>{t('auth.login.noAccount')}</span>
          <a href="/signup">{t('auth.login.toSignup')}</a>
        </div>
      </div>
    </div>

  );
};

export default LoginPage;
