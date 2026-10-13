import React from 'react'
import Link from 'next/link'
import { roboto } from '@/font'

const PrivacyPolicy = () => {
  return (
    <div className={`${roboto.className} bg-[#F8F8FA] min-h-screen flex flex-col`}>
      {/* Header / Hero Section */}
      <div className="phero" style={{ padding: '18px 0' }}>
        <div className="wrap max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="crumb text-xs text-[#D9BEE6] mb-1">
            <Link href="/" className="text-white hover:underline">
              Home
            </Link>{' '}
            / <span className="text-white font-medium">Privacy Policy</span>
          </div>
          <h1 className="text-[clamp(22px,2.6vw,30px)] font-bold text-white leading-tight">
            PRIVACY STATEMENT
          </h1>
          <p className="text-[#E4D3EC] max-w-[820px] mt-1 text-[13.5px] sm:text-[14px]">
            Please read this Privacy Statement carefully to understand how we collect, use, and safeguard your personal information.
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 sm:py-5 flex-1 w-full">
        <div className="bg-white border border-[#E3E5E9] rounded-sm p-4 sm:p-6 md:p-8 shadow-xs space-y-4 text-[#374151]">
          {/* WHAT DO WE DO WITH YOUR INFORMATION? */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              WHAT DO WE DO WITH YOUR INFORMATION?
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              When you purchase something from our store, as part of the buying and selling process, we collect
              the personal information you give us such as your name, address and email address.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              When you browse our store, we also automatically receive your computer’s internet protocol (IP) address
              in order to provide us with information that helps us learn about your browser and operating system.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              With your permission, we may send you emails about our store, new products and other updates.
            </p>
          </div>

          {/* CONSENT */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              CONSENT
            </h2>
            <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-ink mt-2 mb-1">
              How do you get my consent?
            </h3>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              When you provide us with personal information to complete a transaction, verify your credit card,
              place an order, arrange for a delivery or return a purchase, we imply that you consent to our
              collecting it and using it for that specific reason only.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              If we ask for your personal information for a secondary reason, like marketing, we will either
              ask you directly for your expressed consent, or provide you with an opportunity to say no.
            </p>

            <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-ink mt-3 mb-1">
              How do I withdraw my consent?
            </h3>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              If after you opt-in, you change your mind, you may withdraw your consent for us to contact you,
              for the continued collection, use or disclosure of your information, at anytime, by contacting us
              at{' '}
              <a
                href="mailto:skills@knowledgebridgeint.com"
                className="text-purple hover:underline font-semibold"
              >
                skills@knowledgebridgeint.com
              </a>{' '}
              or mailing us at:{' '}
              <span className="font-bold text-ink">
                KnowledgeBridge International Private Limited
              </span>
              , 506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai - 400059,
              Maharashtra, India, Phone:{' '}
              <a href="tel:+912245360000" className="text-purple hover:underline font-semibold">
                +91-22-45360000
              </a>
              .
            </p>
          </div>

          {/* DISCLOSURE */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              DISCLOSURE
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              We may disclose your personal information if we are required by law to do so or if you violate our
              Terms of Service.
            </p>
          </div>

          {/* PAYMENT */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              PAYMENT
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers.
              The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when
              processing payment. Your purchase transaction data is only used as long as is necessary to
              complete your purchase transaction. After that is complete, your purchase transaction information
              is not saved.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security
              Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and
              Discover.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              PCI-DSS requirements help ensure the secure handling of credit card information by our store and
              its service providers.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              For more insight, you may also want to read terms and conditions of Razorpay on{' '}
              <a
                href="https://razorpay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple hover:underline font-semibold"
              >
                https://razorpay.com
              </a>
              .
            </p>
          </div>

          {/* THIRD-PARTY SERVICES */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              THIRD-PARTY SERVICES
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              In general, the third-party providers used by us will only collect, use and disclose your information
              to the extent necessary to allow them to perform the services they provide to us.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              However, certain third-party service providers, such as payment gateways and other payment transaction
              processors, have their own privacy policies in respect to the information we are required to provide
              to them for your purchase-related transactions.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              For these providers, we recommend that you read their privacy policies so you can understand the manner
              in which your personal information will be handled by these providers.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              In particular, remember that certain providers may be located in or have facilities that are located a
              different jurisdiction than either you or us. So if you elect to proceed with a transaction that
              involves the services of a third-party service provider, then your information may become subject to the
              laws of the jurisdiction(s) in which that service provider or its facilities are located.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              Once you leave our store’s website or are redirected to a third-party website or application, you are no
              longer governed by this Privacy Policy or our website’s Terms of Service.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              Links
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              When you click on links on our store, they may direct you away from our site. We are not responsible
              for the privacy practices of other sites and encourage you to read their privacy statements.
            </p>
          </div>

          {/* SECURITY */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              SECURITY
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              To protect your personal information, we take reasonable precautions and follow industry best practices
              to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
            </p>
          </div>

          {/* COOKIES */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              COOKIES
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              We use cookies to maintain session of your user. It is not used to personally identify you on other websites.
            </p>
          </div>

          {/* AGE OF CONSENT */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              AGE OF CONSENT
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              By using this site, you represent that you are at least the age of majority in your state or province of
              residence, or that you are the age of majority in your state or province of residence and you have given
              us your consent to allow any of your minor dependents to use this site.
            </p>
          </div>

          {/* CHANGES TO THIS PRIVACY POLICY */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              CHANGES TO THIS PRIVACY POLICY
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6] mb-1.5">
              We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes
              and clarifications will take effect immediately upon their posting on the website. If we make material
              changes to this policy, we will notify you here that it has been updated, so that you are aware of what
              information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
            </p>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              If our store is acquired or merged with another company, your information may be transferred to the new
              owners so that we may continue to sell products to you.
            </p>
          </div>

          {/* QUESTIONS AND CONTACT INFORMATION */}
          <div>
            <h2 className="text-[16px] sm:text-[17px] font-bold text-ink mb-1.5 pb-1 border-b border-line">
              QUESTIONS AND CONTACT INFORMATION
            </h2>
            <p className="text-[13.5px] sm:text-[14px] leading-[1.6]">
              If you would like to: access, correct, amend or delete any personal information we have about you,
              register a complaint, or simply want more information contact our Privacy Compliance Officer at{' '}
              <a
                href="mailto:skills@knowledgebridgeint.com"
                className="text-purple hover:underline font-semibold"
              >
                skills@knowledgebridgeint.com
              </a>{' '}
              or mailing us at:{' '}
              <span className="font-bold text-ink">
                KnowledgeBridge International Private Limited
              </span>
              , 506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai - 400059,
              Maharashtra, India, Phone:{' '}
              <a href="tel:+912245360000" className="text-purple hover:underline font-semibold">
                +91-22-45360000
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export { PrivacyPolicy, PrivacyPolicy as PrivacyStatement }
export default PrivacyPolicy
