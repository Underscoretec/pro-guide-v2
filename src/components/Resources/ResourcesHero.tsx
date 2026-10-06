import React from 'react'
import Link from 'next/link'

export function ResourcesHero() {
  return (
    <div className="bg-gradient-to-r from-purple-d to-purple text-white py-11">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-xs text-[#D9BEE6] mb-2.5">
          <Link href="/" className="text-white hover:underline">
            Home
          </Link>{' '}
          / Resources
        </div>
        <h1 className="text-[clamp(26px,3.2vw,38px)] font-bold text-white leading-tight">
          Why 3D Simulation Models
        </h1>
        <p className="text-[#E4D3EC] max-w-[820px] mt-2.5 text-[15.5px]">
          Everything surgeons ask us about the models — why they work, what they&apos;re made of, and every procedure
          that can be performed on them.
        </p>
      </div>
    </div>
  )
}
