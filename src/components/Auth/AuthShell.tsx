import React from 'react'

export const inputClass =
  'w-full border border-[#C9CDD3] rounded-[5px] px-3 py-[10px] text-[14px] text-ink bg-white outline-none focus:border-purple focus:ring-2 focus:ring-tint'

export const primaryButtonClass =
  'w-full bg-orange text-white text-[14px] font-bold py-[11px] rounded-[5px] border border-orange hover:bg-orange-d hover:border-orange-d transition-colors disabled:opacity-60 disabled:cursor-not-allowed'

export const AuthShell: React.FC<{
  title: string
  subtitle?: string
  wide?: boolean
  children: React.ReactNode
}> = ({ title, subtitle, wide, children }) => (
  <main className="flex-1 bg-card py-10 px-4">
    <div
      className={`mx-auto bg-white border border-line rounded-[8px] shadow-sm p-6 sm:p-8 ${
        wide ? 'max-w-[720px]' : 'max-w-[440px]'
      }`}
    >
      <h1 className="text-[24px] font-bold text-purple-d mb-1">{title}</h1>
      {subtitle && <p className="text-[14px] text-muted mb-6">{subtitle}</p>}
      {children}
    </div>
  </main>
)

export const Field: React.FC<{
  label: string
  name: string
  type?: string
  required?: boolean
  defaultValue?: string
  placeholder?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  error?: string
  className?: string
  textarea?: boolean
}> = ({ label, name, error, className = '', textarea, required, ...rest }) => (
  <div className={className}>
    <label htmlFor={name} className="block text-[13px] font-semibold text-ink mb-1">
      {label}
      {required && <span className="text-orange"> *</span>}
    </label>
    {textarea ? (
      <textarea id={name} name={name} required={required} rows={2} className={inputClass} {...(rest as any)} />
    ) : (
      <input id={name} name={name} required={required} className={inputClass} {...rest} />
    )}
    {error && <p className="text-[12.5px] text-red-600 mt-1">{error}</p>}
  </div>
)

export const FormError: React.FC<{ message?: string }> = ({ message }) =>
  message ? (
    <div className="bg-red-50 border border-red-200 text-red-700 text-[13.5px] rounded-[5px] px-3 py-2 mb-4">
      {message}
    </div>
  ) : null
