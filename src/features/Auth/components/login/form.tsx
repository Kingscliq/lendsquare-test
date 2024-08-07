import React from 'react'

import * as yup from 'yup'
import { useFormik } from 'formik'
import styles from './login.module.scss'
import TextField from '@components/elements/input-field'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@components/elements/button-c'
import { useState } from 'react'
import { useAuthActions } from '@hooks/useAuth'
import { logo } from '@assets/icons'
import { EyeIcon, EyeOff } from 'lucide-react'

const Form = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState<boolean>(false)
  const [passwordShow, setPasswordShow] = useState<boolean>(false)

  interface FormValues {
    username: string
    password: string
  }

  const intitalValues: FormValues = {
    username: '',
    password: '',
  }

  const loginSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('password is required'),
  })

  const { login } = useAuthActions()
  const { handleSubmit, handleChange, values, errors, touched } =
    useFormik<FormValues>({
      initialValues: intitalValues,
      validationSchema: loginSchema,
      onSubmit: async (values: FormValues) => {
        if (errors.password || errors.username) {
          return
        }
        setLoading(true)
        login(values)
        setTimeout(() => {
          setLoading(false)
          navigate('/')
        }, 5000)
      },
    })

  return (
    <form className={styles.form__container} onSubmit={handleSubmit}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src={logo} alt="Lendsqr logo" />
        </div>
        <div className={styles.headings}>
          <h2>Welcome!</h2>
          <p>Enter details to login.</p>
        </div>
        <div>
          <div className={styles.input__container}>
            <TextField
              inputClass={styles.input}
              value={values.username}
              placeholder="Enter Username"
              name="username"
              error={!!errors?.username && touched?.username}
              onChange={handleChange}
              message={errors.username}
            />
          </div>
          <div className={styles.input__container}>
            <TextField
              inputClass={styles.input}
              value={values.password}
              placeholder="Enter Password"
              name="password"
              error={!!errors?.password && touched?.password}
              onChange={handleChange}
              message={errors.password}
              type={passwordShow ? 'text' : 'password'}
              icon={
                <section
                  style={{ cursor: 'pointer' }}
                  onClick={() => setPasswordShow(!passwordShow)}
                >
                  {passwordShow ? <EyeIcon /> : <EyeOff />}
                </section>
              }
            />
          </div>
          <div className={styles.link}>
            <Link to={'/'}>Forgot Password</Link>
          </div>
        </div>
        <div>
          <Button label="LOG IN" type="submit" loading={loading} />
        </div>
      </div>
    </form>
  )
}

export default Form
