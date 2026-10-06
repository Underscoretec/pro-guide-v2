import React from 'react'

const feedbackQuotes = [
  {
    quote:
      '\u201CFor the first time I have operated on a 3D-printed temporal bone and I got what I was looking for in a cadaver bone.\u201D',
    author: 'Workshop participant \u2014 MS, Otolaryngology',
  },
  {
    quote:
      '\u201CExtremely impressed with the quality of the temporal bone. It is the best imitation of the normal bone I have drilled.\u201D',
    author: 'Workshop participant \u2014 MS, Otolaryngology',
  },
  {
    quote:
      '\u201CMy perfect temporal bone is really a very nice bone to learn. It is a boon in training for the younger generation.\u201D',
    author: 'Workshop participant \u2014 MS, Otolaryngology',
  },
  {
    quote:
      '\u201CIt is very good learning session. Also is the first time I had operated with such type of workshop.\u201D',
    author: 'Workshop participant \u2014 MS, Otolaryngology',
  },
  {
    quote:
      '\u201CThe model was very similar to real temporal bone and the team cleared our doubts and helped us at each step.\u201D',
    author: 'Workshop participant \u2014 MS, Otolaryngology',
  },
  {
    quote:
      '\u201CHighlight of the workshop is knowledge with the profound experience of workshop director.\u201D',
    author: 'Workshop participant \u2014 MS, Otolaryngology',
  },
]

const learnerStories = [
  {
    text: 'The hands-on format changed how I approach mastoid surgery. Drilling my own model at every station \u2014 with faculty beside me \u2014 did what years of observation could not.',
    author: 'Resident delegate \u2014 Temporal Bone Workshop',
  },
  {
    text: "The sinus model's landmarks under the endoscope are remarkably true to life. I returned to my department and asked them to equip our skills lab with these models.",
    author: 'Consultant delegate \u2014 Paranasal Sinus Workshop',
  },
  {
    text: 'From registration to certificate, everything was organised. The models, the stations, the teaching \u2014 it is the most practice I have packed into two days.',
    author: 'Fellow delegate \u2014 Skull Base Workshop',
  },
]

export const TestimonialsSection: React.FC = () => {
  return (
    <>
      {/* Feedback Chips Section */}
      <section className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="sechead">
            <h2 className="font-bold text-ink">
              Temporal Bone Dissection Workshop Feedback
            </h2>
            <div className="rule" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {feedbackQuotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-line border-l-4 border-l-purple rounded-[6px] p-[16px_18px] text-[14px] text-[#3A4048] flex flex-col justify-between shadow-sm"
              >
                <p className="leading-relaxed">{item.quote}</p>
                <span className="block mt-[10px] text-[12px] font-bold text-purple uppercase tracking-[0.6px]">
                  {item.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Gradient Section */}
      <section className="py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="sechead">
            <h2 className="font-bold text-ink">What Our Learners Are Saying</h2>
            <div className="rule" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {learnerStories.map((story, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#4A148C] to-[#673AB7] rounded-[10px] text-[#F2E8F6] p-6 relative text-[14.5px] leading-relaxed shadow-md flex flex-col justify-between"
              >
                <div
                  className="absolute top-1 right-4 text-[60px] text-white/25 font-serif select-none pointer-events-none leading-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <p className="relative z-10">{story.text}</p>
                <span className="relative z-10 block mt-[14px] font-bold text-white text-[13px]">
                  {story.author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TestimonialsSection
