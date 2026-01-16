import { Formik, Form as FormikForm, Field } from "formik";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import * as Yup from 'yup';
import { useNavigate, Navigate } from "react-router-dom";
import { loginUser } from "../../api/login.js";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .required('Введите юзернейм'),
  password: Yup.string()
    .required('Введите пароль'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    if (token) {
      return <Navigate to={`/`} />;
    }

    return (
      <div>
        <h1>Войти</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await loginUser(values.username, values.password);
              navigate("/");
            } catch (err) {
              console.log(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <FormikForm>
              <FloatingLabel
                controlId="floatingUsername"
                label="Ваш никнейм"
                className="mb-3"
              >
                <Form.Control
                  as={Field}
                  name="username"
                  type="text"
                  placeholder="username"
                  isInvalid={touched.username && !!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {String(errors.username)}
                </Form.Control.Feedback>
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Пароль"
              >
                <Form.Control
                  as={Field}
                  name="password"
                  type="password"
                  placeholder="Password"
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {String(errors.password)}
                </Form.Control.Feedback>
              </FloatingLabel>

              <Button
                variant="outline-primary"
                type="submit"
                disabled={isSubmitting}
              >
                Отправить
              </Button>
            </FormikForm>
          )}
        </Formik>
      </div>

    );
};

export default LoginPage;
