import type { FormState, FormErrors } from './types'

export function validateField(
  name: keyof FormState,
  value: string | boolean,
  form: FormState
): FormErrors {
  const errors: FormErrors = {}

  switch (name) {
    case 'email':
      if (typeof value === 'string' && !value.includes('@')) {
        errors.email = 'Invalid email address'
      }
      break

    case 'password':
      if (typeof value === 'string') {
        if (value.length < 8) {
          errors.password = 'Password must be at least 8 characters'
          break
        }

        // ❗ NUEVA VALIDACIÓN
        const emailPart = form.email.split('@')[0]

        if (
          emailPart &&
          value.toLowerCase().includes(emailPart.toLowerCase())
        ) {
          errors.password =
            'Password should not contain parts of your email'
        }
      }
      break

    case 'confirmPassword':
      if (value !== form.password) {
        errors.confirmPassword = 'Passwords do not match'
      }
      break

    case 'acceptTerms':
      if (value !== true) {
        errors.acceptTerms = 'You must accept the terms'
      }
      break
  }

  return errors
}