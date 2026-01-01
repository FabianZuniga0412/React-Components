/*
Usuario escribe
→ actualizamos estado
→ validamos
→ mostramos errores
*/
import { useState } from 'react'
import type { FormState, FormErrors } from './types'
import { validateField } from './validators'

export default function ControlledForm() {
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setForm((prev) => {
      const updatedForm = { ...prev, [name]: fieldValue }

      const fieldErrors = validateField(
        name as keyof FormState,
        fieldValue,
        updatedForm
      )

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...fieldErrors,
        [name]: fieldErrors[name as keyof FormErrors],
      }))

      return updatedForm
    })
  }

  const isFormValid =
    Object.values(errors).every((e) => !e) &&
    form.email &&
    form.password &&
    form.confirmPassword &&
    form.acceptTerms

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    console.log('Form submitted:', form)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Create Account
      </h2>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="
                      w-full rounded p-2
                      border border-gray-300
                      bg-white text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-blue-500

                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:text-white
                      dark:placeholder-gray-400
                    "
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="
                      w-full rounded p-2
                      border border-gray-300
                      bg-white text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-blue-500

                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:text-white
                      dark:placeholder-gray-400
                    "
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="
                      w-full rounded p-2
                      border border-gray-300
                      bg-white text-gray-900
                      focus:outline-none focus:ring-2 focus:ring-blue-500

                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:text-white
                      dark:placeholder-gray-400
                    "
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Terms */}
      <label className="
        flex items-center gap-2 text-sm
        text-gray-700
        dark:text-gray-300
      ">
        <input
          type="checkbox"
          name="acceptTerms"
          checked={form.acceptTerms}
          onChange={handleChange}
          className="
            accent-blue-500
            dark:accent-blue-400
          "
        />
        Accept terms and conditions
      </label>
      {errors.acceptTerms && (
        <p className="text-sm text-red-500">
          {errors.acceptTerms}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full rounded bg-blue-500 py-2 text-white disabled:opacity-50"
      >
        Create Account
      </button>
    </form>
  )
}

