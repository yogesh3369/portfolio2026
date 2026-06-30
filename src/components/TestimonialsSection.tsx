"use client";
import { useEffect } from 'react';
import { useMotionValueEvent } from 'motion/react';
import {
  CardTransformed,
  CardsContainer,
  ContainerScroll,
  useContainerScrollContext,
} from './ui/animated-cards-stack';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { spokeCardSound } from '../hooks/useSoundEffects';

const ScrollSpokeSound = () => {
  const { scrollYProgress } = useContainerScrollContext();

  useEffect(() => {
    spokeCardSound.setVariant('retro');
    spokeCardSound.reset();
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    spokeCardSound.update(value);
  });

  return null;
};

type Testimonial = {
  id: string;
  name: string;
  role: string;
  relation: string;
  quote: string;
  avatarUrl?: string;
  linkedinUrl: string;
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rajat-sahu',
    name: 'Rajat Sahu',
    role: 'Product Designer @ IndiGo · M.Des NIFT',
    relation: 'Worked with Yogesh on the same team',
    quote:
      "Yogesh has a strong grasp of UX fundamentals — his feedback is thoughtful, logical, and rooted in sound reasoning. He communicates effectively, drives projects from design through execution with real ownership, and is quick to adopt new technologies and use AI thoughtfully in his work.",
    linkedinUrl: 'https://www.linkedin.com/in/sahurajat/',
  },
  {
    id: 'gaurav-kumar',
    name: 'Gaurav Kumar',
    role: 'Product Designer @ IndiGo · Ex-Microsoft, Cars24',
    relation: 'Worked with Yogesh on the same team',
    quote:
      "Yogesh is an enthusiastic and highly collaborative professional with great skills in vibe coding and problem-solving. He is always willing to support his colleagues whenever they face challenges, making him a dependable team player. One of his standout qualities is his curiosity — he consistently asks thoughtful questions to gain clarity and ensure a thorough understanding of tasks before execution.",
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
      "I had the pleasure of working alongside Yogesh in the same team, and his energy, creativity, and systems thinking stood out every single time. He brings a unique perspective to problem-solving, blending user empathy with sharp design instincts. Working with him was always collaborative and inspiring — anyone would be lucky to have him on their team.",
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
            Notes from teammates and managers I've worked alongside — on design, execution, and how I show up.
          </p>
        </div>

        <ContainerScroll className="h-[300vh]">
          <ScrollSpokeSound />
          <div className="sticky left-0 top-0 h-svh w-full flex items-center">
            <CardsContainer className="mx-auto size-full h-[440px] w-full max-w-[480px]">
              {TESTIMONIALS.map((testimonial, index) => (
                <CardTransformed
                  arrayLength={TESTIMONIALS.length}
                  key={testimonial.id}
                  variant="light"
                  index={index + 2}
                  role="article"
                  aria-labelledby={`card-${testimonial.id}-title`}
                  aria-describedby={`card-${testimonial.id}-content`}
                >
                  <div className="flex flex-col items-center space-y-5 text-center">
                    <svg className="size-8 text-blue-600/30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.333 8C5.6 8 2.667 10.933 2.667 14.667c0 3.733 2.933 6.666 6.666 6.666.711 0 1.4-.111 2.045-.32-.622 2.4-2.578 4.32-5.045 4.987v2.667c4.978-.8 8.667-5.067 8.667-10.227V14.667C15 10.933 12.844 8 9.333 8zm14.667 0c-3.733 0-6.667 2.933-6.667 6.667 0 3.733 2.934 6.666 6.667 6.666.711 0 1.4-.111 2.044-.32-.622 2.4-2.577 4.32-5.044 4.987v2.667c4.978-.8 8.667-5.067 8.667-10.227V14.667C29.667 10.933 27.511 8 24 8z" />
                    </svg>
                    <p
                      id={`card-${testimonial.id}-content`}
                      className="text-[16px] sm:text-[17px] leading-relaxed text-black/80"
                    >
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <a
                    href={testimonial.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 pt-2 group/avatar"
                  >
                    <Avatar className="!size-12 border border-black/10">
                      {testimonial.avatarUrl && (
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                      )}
                      <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <span
                        id={`card-${testimonial.id}-title`}
                        className="block text-[15px] font-semibold tracking-tight text-black group-hover/avatar:text-blue-600 transition-colors"
                      >
                        {testimonial.name}
                      </span>
                      <span className="block text-[13px] text-black/50">{testimonial.role}</span>
                      <span className="block text-[12px] text-black/35 font-mono mt-0.5">
                        {testimonial.relation}
                      </span>
                    </div>
                  </a>
                </CardTransformed>
              ))}
            </CardsContainer>
          </div>
        </ContainerScroll>
      </div>
    </section>
  );
};
