'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  initialCountry?: string
  /** skip detection entirely, e.g. when a value already came back from a form re-submission */
  locked?: boolean
  /** snap the IP-detected name onto one of these (for a fixed <select> of country names) */
  matchNames?: string[]
}

export function useDetectedCountry({ initialCountry = '', locked = false, matchNames }: Options = {}) {
  const [country, setCountry] = useState(initialCountry)
  const countryLocked = useRef(locked)

  useEffect(() => {
    if (countryLocked.current) return

    // Timezone gives a free, instant hint before the network round-trip resolves
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      if (!countryLocked.current && (timeZone === 'Asia/Calcutta' || timeZone === 'Asia/Kolkata')) {
        setCountry('India')
      }
    } catch {
      // Intl not supported in this browser; fall back to the IP lookup below
    }

    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        if (countryLocked.current) return
        const detectedName = String(data?.country_name ?? '').trim()
        if (!detectedName) return
        if (matchNames) {
          const match = matchNames.find((name) => name.toLowerCase() === detectedName.toLowerCase())
          if (match) setCountry(match)
        } else {
          setCountry(detectedName)
        }
      })
      .catch(() => {
        // geolocation lookup failed; keep the timezone guess / default
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const lockCountry = () => {
    countryLocked.current = true
  }

  return { country, setCountry, lockCountry }
}
