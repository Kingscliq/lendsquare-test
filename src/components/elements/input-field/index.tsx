import React, { ComponentProps, JSXElementConstructor, ReactNode } from 'react'
import styles from './text-field.module.scss'

export interface TextFieldProps extends Partial<HTMLInputElement> {
  onClick?: () => void
  error?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  success?: boolean
  label?: string
  inputRef?: string
  message?: string
  props?: ComponentProps<JSXElementConstructor<any>>
  inputClass?: string
  icon?: ReactNode
}

const TextField: React.FC<TextFieldProps> = ({
  type,
  placeholder,
  value,
  onClick,
  error,
  className,
  onChange,
  name,
  label,
  inputRef,
  message,
  inputClass,
  props,
  disabled,
  icon,
}) => {
  return (
    <div className={`${styles.field__container}`}>
      {label && (
        <label style={{ color: error ? '#e11900 ' : '0' }}>{label}</label>
      )}
      <div
        className={[
          className,
          `${styles.text__field__container}
              ${error ? styles.error__border : '0'}`,
        ].join(' ')}
      >
        <input
          type={type || 'text'}
          className={[
            inputClass,
            styles.text__field,
            error ? styles.error__border : styles.border,
            error ? 'error__border' : '0',
          ].join(' ')}
          placeholder={placeholder || 'Enter a value'}
          value={value}
          onClick={onClick}
          onChange={onChange}
          name={name}
          disabled={disabled}
          ref={inputRef}
          {...props}
        />
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      {error && <small style={{ color: '#e11900' }}>{message}</small>}
    </div>
  )
}

export default TextField
