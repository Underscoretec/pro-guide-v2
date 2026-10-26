'use client'

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

export const isTurnstileEnabled = Boolean(SITE_KEY)

export interface TurnstileWidgetHandle {
  reset: () => void
}

interface TurnstileWidgetProps {
  onToken: (token: string) => void
}

/** Cloudflare Turnstile widget in a bordered box. Reports the pass token (or '' when expired/failed). */
export const TurnstileWidget = forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(({ onToken }, ref) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | undefined>(undefined)
  const onTokenRef = useRef(onToken)
  onTokenRef.current = onToken

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current('')
      if (widgetId.current) window.turnstile?.reset(widgetId.current)
    },
  }))

  useEffect(() => {
    if (!SITE_KEY) return
    const mount = () => {
      if (!hostRef.current || !window.turnstile || widgetId.current) return
      widgetId.current = window.turnstile.render(hostRef.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => onTokenRef.current(token),
        'expired-callback': () => onTokenRef.current(''),
        'error-callback': () => onTokenRef.current(''),
      })
    }
    if (window.turnstile) {
      mount()
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
      if (!script) {
        script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        document.head.appendChild(script)
      }
      script.addEventListener('load', mount)
    }
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current)
      widgetId.current = undefined
    }
  }, [])

  if (!SITE_KEY) return null

  return (
    <div className="border border-[#E5E7EB] rounded-sm p-3.5 bg-[#F9FAFB] flex items-center justify-start min-h-[65px] mb-[14px]">
      <div ref={hostRef} />
    </div>
  )
})
TurnstileWidget.displayName = 'TurnstileWidget'
