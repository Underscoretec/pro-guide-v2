import React from 'react'
import Image from 'next/image'

export function DoctorAcknowledgmentSection() {
  return (
    <section className="py-[52px] bg-purple text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[44px] items-center">
          <div>
            <h2 className="text-[clamp(23px,2.6vw,31px)] font-bold text-white mb-3.5 leading-tight">
              Acknowledgment From a Globally Acclaimed Otolaryngologist
            </h2>
            <p className="text-[#EBDDF1] text-[15.5px] leading-[1.7]">
              &ldquo;I have used the 3D-printed temporal bone for training people in ear surgery, especially in cochlear
              implants, and have found that the anatomical landmarks are really very precise and the feel that you get
              when you drill this bone is as close to drilling the real temporal bone as possible. So, I find using
              the 3D-printed temporal bone a very convenient way for training people for ear surgery, especially for
              cochlear implant surgery.&rdquo;
            </p>
            <p className="mt-[14px] font-bold text-white">Dr. Milind Kirtane</p>
            <p className="text-[12.5px] text-[#D9C4E3]">
              MS (ENT), Padma Shri Awardee · Consulting ENT Surgeon, P. D. Hinduja National Hospital, Mumbai; Breach
              Candy; Saifee Hospital · Hon. Surgeon, King Edward Memorial Hospital
            </p>
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-lg">
            <Image
              src="/images/photo_lab2.jpg"
              alt="Workshop training floor"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
