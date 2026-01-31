import { Formik, Form as FormikForm, Field } from 'formik'
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { loginUser } from '../api/auth.js'
import { setCredentials } from '../store/slices/authSlice.js'
import { loginSchema } from '../schemas/validationSchema.js'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const { t } = useTranslation()

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-6 col-xxl-4">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={async (values, { setSubmitting, setStatus }) => {
                  setStatus(null)
                  try {
                    const data = await loginUser(values.username, values.password)
                    dispatch(setCredentials({
                      token: data.token,
                      username: values.username,
                    }))
                    navigate('/')
                  }
                  catch (err) {
                    if (err?.response?.status === 401) {
                      setStatus('auth.login.authFailed')
                    }
                    else {
                      setStatus('auth.login.error')
                    }
                  }
                  finally {
                    setSubmitting(false)
                  }
                }}
              >
                {({ isSubmitting, errors, touched, status }) => (
                  <FormikForm>
                    <h1 className="text-center mb-4">{t('auth.login.title')}</h1>
                    {status && (
                      <Alert variant="danger" className="mb-3">
                        {t(status)}
                      </Alert>
                    )}
                    <FloatingLabel
                      controlId="username"
                      label={t('auth.login.username')}
                      className="mb-3"
                    >
                      <Form.Control
                        as={Field}
                        name="username"
                        autoComplete="username"
                        placeholder={t('auth.login.placeholders.username')}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.username)}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="password"
                      label={t('auth.login.password')}
                      className="mb-4"
                    >
                      <Form.Control
                        as={Field}
                        name="password"
                        type="password"
                        autoComplete="current-password"
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
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      {t('auth.login.submit')}
                    </Button>
                  </FormikForm>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('auth.login.noAccount')}</span>
                {' '}
                <Link to="/signup">{t('auth.login.toSignup')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
