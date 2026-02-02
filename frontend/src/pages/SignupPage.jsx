import { Formik, Form as FormikForm, Field } from 'formik'
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { signupUser } from '../api/auth.js'
import { setCredentials } from '../store/slices/authSlice.js'
import { signupSchema } from '../schemas/validationSchema.js'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const { t } = useTranslation()

  if (isAuthenticated) {
    return <Navigate to="/" />
  }

  const onSubmit = async (values, { setSubmitting, setStatus }) => {
    setStatus(null)
    try {
      const data = await signupUser(values.username, values.password)
      dispatch(setCredentials({
        token: data.token,
        username: values.username,
      }))
      navigate('/')
    }
    catch (err) {
      if (err?.response?.status === 409) {
        setStatus('auth.signup.accountExists')
      }
      else {
        setStatus('auth.signup.error')
      }
    }
    finally {
      setSubmitting(false)
    }
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
                  confirmPassword: '',
                }}
                validationSchema={signupSchema}
                onSubmit={onSubmit}
              >
                {({ isSubmitting, errors, touched, status }) => (
                  <FormikForm>
                    <h1 className="text-center mb-4">{t('auth.signup.title')}</h1>
                    {status && (
                      <Alert variant="danger" className="mb-3">
                        {t(status)}
                      </Alert>
                    )}
                    <FloatingLabel
                      controlId="username"
                      label={t('auth.signup.username')}
                      className="mb-3"
                    >
                      <Form.Control
                        as={Field}
                        name="username"
                        type="text"
                        autoComplete="username"
                        placeholder={t('auth.signup.placeholders.username')}
                        isInvalid={touched.username && !!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.username)}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="password"
                      label={t('auth.signup.password')}
                      className="mb-3"
                    >
                      <Form.Control
                        as={Field}
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder={t('auth.signup.placeholders.password')}
                        isInvalid={touched.password && !!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.password)}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel
                      controlId="confirmPassword"
                      label={t('auth.signup.confirmPassword')}
                      className="mb-4"
                    >
                      <Form.Control
                        as={Field}
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder={t('auth.signup.placeholders.confirmPassword')}
                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {t(errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Button
                      variant="outline-primary"
                      type="submit"
                      className="w-100 mb-3"
                      disabled={isSubmitting}
                    >
                      {t('auth.signup.submit')}
                    </Button>
                  </FormikForm>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('auth.login.alreadyRegistered')}</span>
                {' '}
                <Link to="/login">{t('auth.login.toLogin')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
