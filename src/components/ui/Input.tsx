import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseStyles =
      'w-full px-4 py-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2'
    const normalStyles = 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500'
    const disabledStyles = 'disabled:bg-gray-100 disabled:cursor-not-allowed'

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <input
          ref={ref}
          className={`${baseStyles} ${error ? errorStyles : normalStyles} ${disabledStyles} ${className}`}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
          }
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${props.id}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
