import { Formik, Form, Field } from 'formik'

export default () => {
  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => {
        console.log(values)
      }}
    >
      <Form>
        <div>
          <label htmlFor="email">login</label>
          <Field name="email" type="email" />
        </div>

        <div>
          <label htmlFor="password">password</label>
          <Field name="password" type="password" />
        </div>

        <button type="submit">
          Отправить
        </button>
      </Form>
    </Formik>
  )
}