import { SlidingTestimonials, type SlidingTestimonial } from './ui/sliding-testimonial';

const TESTIMONIALS: SlidingTestimonial[] = [
  {
    id: 'rajat-sahu',
    name: 'Rajat Sahu',
    role: 'Product Designer @ IndiGo · M.Des NIFT',
    relation: 'Worked with Yogesh on the same team',
    quote:
      "Yogesh has a strong grasp of UX fundamentals - his feedback is thoughtful, logical, and rooted in sound reasoning. He communicates effectively, drives projects from design through execution with real ownership, and is quick to adopt new technologies and use AI thoughtfully in his work.",
    linkedinUrl: 'https://www.linkedin.com/in/sahurajat/',
  },
  {
    id: 'gaurav-kumar',
    name: 'Gaurav Kumar',
    role: 'Product Designer @ IndiGo · Ex-Microsoft, Cars24',
    relation: 'Worked with Yogesh on the same team',
    quote:
      "Yogesh is an enthusiastic and highly collaborative professional with great skills in vibe coding and problem-solving. He is always willing to support his colleagues whenever they face challenges, making him a dependable team player. One of his standout qualities is his curiosity - he consistently asks thoughtful questions to gain clarity and ensure a thorough understanding of tasks before execution.",
    avatarUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQE_Yr0Z6TXaAA/profile-displayphoto-crop_800_800/B56Z50fzrEGgAQ-/0/1780070956490?e=1784160000&v=beta&t=yJ_vYOOLYoLhLI3etsKzB-PlVEY6-VIcvFkmGsBOZjk',
    linkedinUrl: 'https://www.linkedin.com/in/gaurav-kumar-b96309211/',
  },
  {
    id: 'yagyini-bisht',
    name: 'Yagyini Bisht',
    role: 'Product Designer · AI Assisted Workflows',
    relation: 'Worked with Yogesh on the same team',
    quote:
      "Working with Yogesh has been a really great experience. He's someone who is always willing to learn, take initiative, and support the team whenever needed. His positive attitude, creativity, and dedication to doing good work truly stand out. Yogesh brings great energy to the team and is someone you can always rely on.",
    avatarUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQFnYay-HIRKPg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1715947690609?e=1784160000&v=beta&t=DsopvxmMHBTJc-xhAmEqDlR3zvjraQnCHLi5X1EPqts',
    linkedinUrl: 'https://www.linkedin.com/in/yagyini-bisht-0624311b3/',
  },
  {
    id: 'piyush-lahori',
    name: 'Piyush Lahori',
    role: 'Software Engineer Intern @ Nykaa',
    relation: 'Reported to Yogesh directly',
    quote:
      "I had a wonderful experience working under Mr. Yogesh Yadav during my two-month internship. He was an excellent mentor who provided clear guidance and valuable insights in the fields of AI and technology. His support and feedback greatly enhanced my learning and professional growth.",
    avatarUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQEmOp9cFt7Z8w/profile-displayphoto-scale_400_400/B56Z7MJUrtGUAo-/0/1781541457526?e=1784160000&v=beta&t=29vbPNVXDSZyNeIiSTTnfTv2A6tR_9Td5x6bWjfWONk',
    linkedinUrl: 'https://www.linkedin.com/in/piyush-lahori-474380281/',
  },
  {
    id: 'akshay-chauhan',
    name: 'Akshay Chauhan',
    role: 'Product Designer @ Pixell',
    relation: 'Worked with Yogesh on the same team',
    quote:
      "I had the pleasure of working alongside Yogesh in the same team, and his energy, creativity, and systems thinking stood out every single time. He brings a unique perspective to problem-solving, blending user empathy with sharp design instincts. Working with him was always collaborative and inspiring - anyone would be lucky to have him on their team.",
    avatarUrl:
      'https://media.licdn.com/dms/image/v2/D5603AQFU6TZlRodODw/profile-displayphoto-crop_800_800/B56ZlXfJmCG4AI-/0/1758109409022?e=1784160000&v=beta&t=3a3krcsi2I9kTfR6ph8WIOkEXxCzzTK1ZgsGceMOFF4',
    linkedinUrl: 'https://www.linkedin.com/in/aksych/',
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative z-1 py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-14 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              06
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              Testimonials <span className="text-blue-600 font-bold ml-1">///</span>
            </div>
          </div>

          <h2
            className="tracking-tight font-semibold text-black max-w-4xl"
            style={{
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.05',
              fontSize: 'clamp(42px, 6vw, 76px)',
            }}
          >
            What People Say<br />
            <span className="text-black/40 italic font-medium">After Working With Me.</span>
          </h2>

          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            Notes from teammates and managers I've worked alongside - on design, execution, and how I show up.
          </p>
        </div>
      </div>

      <SlidingTestimonials testimonials={TESTIMONIALS} />
    </section>
  );
};
