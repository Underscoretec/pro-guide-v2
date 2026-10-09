import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

export const inputClass =
  'w-full border border-[#C9CDD3] rounded-[6px] px-3.5 py-[10px] text-[14px] text-ink bg-white outline-none focus:border-purple focus:ring-2 focus:ring-purple/15 transition-all placeholder:text-[#9CA3AF]'

export const primaryButtonClass =
  'w-full bg-purple text-white text-[14px] font-bold py-[11px] px-4 rounded-[6px] border border-purple hover:bg-purple-d hover:border-purple-d shadow-[0_2px_8px_rgba(103,58,183,0.25)] hover:shadow-[0_4px_14px_rgba(103,58,183,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer active:scale-[0.99]'

export const AuthShell: React.FC<{
  title: string
  subtitle?: string
  wide?: boolean
  children: React.ReactNode
}> = ({ title, subtitle, wide, children }) => (
  <main className="flex-1 bg-[#F8F8FA] py-10 sm:py-14 px-4">
    <div
      className={`mx-auto bg-white border border-line rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-6 sm:p-9 ${
        wide ? 'max-w-[740px]' : 'max-w-[440px]'
      }`}
    >
      <h1 className="text-[24px] sm:text-[26px] font-bold text-purple-d tracking-tight mb-1.5">{title}</h1>
      {subtitle && <p className="text-[13.5px] text-muted mb-6 leading-relaxed">{subtitle}</p>}
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
    <label htmlFor={name} className="block text-[13px] font-semibold text-ink mb-1.5">
      {label}
      {required && <span className="text-orange"> *</span>}
    </label>
    {textarea ? (
      <textarea id={name} name={name} required={required} rows={2} className={inputClass} {...(rest as any)} />
    ) : (
      <input id={name} name={name} required={required} className={inputClass} {...rest} />
    )}
    {error && <p className="text-[12.5px] text-red-600 mt-1 font-medium">{error}</p>}
  </div>
)

export const FormError: React.FC<{ message?: string }> = ({ message }) =>
  message ? (
    <div className="bg-red-50 border border-red-200 text-red-700 text-[13.5px] rounded-[6px] px-3.5 py-2.5 mb-4 flex items-center gap-2">
      <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0" />
      <span>{message}</span>
    </div>
  ) : null
