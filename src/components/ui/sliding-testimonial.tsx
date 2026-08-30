import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

export type SlidingTestimonial = {
  id: string;
  name: string;
  role: string;
  relation?: string;
  quote: string;
  avatarUrl?: string;
  linkedinUrl?: string;
};

interface SlidingTestimonialsProps {
  testimonials: SlidingTestimonial[];
  className?: string;
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

export function SlidingTestimonials({ testimonials, className }: SlidingTestimonialsProps) {
  const track = [...testimonials, ...testimonials];

  return (
    <div
      className={cn('x-slider-track relative w-full overflow-hidden', className)}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div className="flex w-max animate-x-slider gap-5" style={{ willChange: 'transform' }}>
        {track.map((testimonial, index) => (
          <article
            key={`${testimonial.id}-${index}`}
            aria-hidden={index >= testimonials.length}
            className="flex w-[340px] shrink-0 flex-col justify-between gap-6 rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:w-[400px] sm:p-7"
          >
            <div className="space-y-4">
              <svg className="size-7 text-blue-600/25" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.333 8C5.6 8 2.667 10.933 2.667 14.667c0 3.733 2.933 6.666 6.666 6.666.711 0 1.4-.111 2.045-.32-.622 2.4-2.578 4.32-5.045 4.987v2.667c4.978-.8 8.667-5.067 8.667-10.227V14.667C15 10.933 12.844 8 9.333 8zm14.667 0c-3.733 0-6.667 2.933-6.667 6.667 0 3.733 2.934 6.666 6.667 6.666.711 0 1.4-.111 2.044-.32-.622 2.4-2.577 4.32-5.044 4.987v2.667c4.978-.8 8.667-5.067 8.667-10.227V14.667C29.667 10.933 27.511 8 24 8z" />
              </svg>
              <p className="text-[15px] leading-relaxed text-black/75 sm:text-[16px]">
                {testimonial.quote}
              </p>
            </div>

            <div className="flex items-center gap-3 border-t border-black/10 pt-5">
              <Avatar className="!size-11 border border-black/10">
                {testimonial.avatarUrl && (
                  <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                )}
                <AvatarFallback>{initials(testimonial.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-left">
                <span className="block truncate text-[15px] font-semibold tracking-tight text-black">
                  {testimonial.name}
                </span>
                <span className="block truncate text-[13px] text-black/50">{testimonial.role}</span>
                {testimonial.relation && (
                  <span className="block truncate font-mono text-[11px] text-black/35">
                    {testimonial.relation}
                  </span>
                )}
              </div>
              {testimonial.linkedinUrl && (
                <a
                  href={testimonial.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${testimonial.name} on LinkedIn`}
                  tabIndex={index >= testimonials.length ? -1 : 0}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-black/30 transition-colors hover:bg-blue-600/10 hover:text-blue-600"
                >
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
                  </svg>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
