import MdiGithub from '~icons/mdi/github';
import MdiLinkedin from '~icons/mdi/linkedin';
import MdiVideo from '~icons/mdi/video';
import MingcuteCalendar2Fill from '~icons/mingcute/calendar-2-fill';
import NotoEyes from '~icons/noto/eyes';

import { CircleComplete, CircleIncomplete } from '@/components/assets/shapes/circles';
import { SpringyArrow, WavyGrass } from '@/components/assets/shapes/lines';
import { KawungShape, KiteishShape } from '@/components/assets/shapes/misc';
import { FloralShape } from '@/components/assets/shapes/ornaments';
import { ContactButton } from '@/components/layouts/home/contact-button';
import { Section } from '@/components/layouts/section';

export function Contact() {
  return (
    <Section
      id="contact"
      title={
        <>
          Like the <span className="text-xblue">Vibes</span>?
        </>
      }
      icon={
        <FloralShape
          className="h-full w-full rotate-[45deg] text-xpink transition-transform hover:scale-120 hover:rotate-[-20deg]"
          aria-hidden="true"
        />
      }
      className="border-b-0"
    >
      <div className="grid grid-flow-row grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-[auto_1fr_1fr] sm:gap-4 lg:grid-cols-4 lg:grid-rows-[auto_1fr] xl:grid-flow-col xl:grid-cols-[auto_1fr_1fr] xl:grid-rows-2">
        <div className="group/card relative z-0 sm:col-span-2 lg:col-span-4 xl:col-span-1 xl:row-span-2">
          <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden rounded-cxl bg-xbg p-8 text-center">
            <KawungShape
              className="pointer-events-none absolute -right-16 -bottom-16 -z-10 size-[260px] text-xblue opacity-15 transition-[rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-none group-hover/card:rotate-45 motion-reduce:transition-none"
              aria-hidden="true"
            />
            <div className="text-left font-title text-lg text-pretty lg:text-2xl">
              Wanna{' '}
              <span className="text-xblue transition-colors duration-200 group-hover/card:text-xred">
                work together
              </span>{' '}
              or have{' '}
              <span className="text-xblue transition-colors duration-200 group-hover/card:text-xred">an idea</span>{' '}
              you'd like to{' '}
              <span className="text-xblue transition-colors duration-200 group-hover/card:text-xred">discuss</span>
              ?
              <SpringyArrow className="mt-3 ml-3 inline-flex h-auto w-[28px] align-top text-xred md:w-[53px]" />
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <WavyGrass className="block w-[150px] min-w-1/3 text-xyellow transition-colors duration-400 group-hover/card:text-xcyan" />
              <div className="w-min text-left font-title text-[max(1.5rem,8cqw)] leading-[1.15] font-bold text-xblue uppercase transition-colors duration-400 group-hover/card:text-xred md:text-[52px]">
                Let's Connect
              </div>
            </div>
          </div>

          <KiteishShape className="absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 text-xred transition-[rotate,color] duration-400 group-hover/card:rotate-6 group-hover/card:text-xarrow lg:block" />
          <KiteishShape className="absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 text-xred transition-[rotate,color] duration-400 group-hover/card:-rotate-12 group-hover/card:text-xyellow lg:block" />
        </div>

        <ContactButton href="https://cal.com/nourman">
          <div className="relative mx-1 size-16 shrink-0">
            <MingcuteCalendar2Fill className="absolute top-0 left-0 translate-x-[35%] translate-y-[35%] text-4xl text-xpink transition-colors duration-400 group-hover:text-xred" />
            <MdiVideo className="absolute top-0 left-0 translate-x-[170%] translate-y-[170%] text-xl text-xblue transition-colors duration-400 group-hover:text-xyellow" />
            <CircleIncomplete className="h-full w-full text-xstroke transition-[rotate,color] duration-400 group-hover:rotate-180 group-hover:text-xblue" />
          </div>
          Book a Call ↗
        </ContactButton>

        <ContactButton href="https://www.linkedin.com/in/nourmanhajar">
          <div className="relative size-18 shrink-0">
            <MdiLinkedin className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-[39px] text-xblue transition-colors duration-400 group-hover:text-xstroke" />
            <CircleComplete className="h-full w-full -translate-y-1 rotate-180 text-xyellow transition-[rotate,color] duration-400 group-hover:rotate-0 group-hover:text-xpink" />
          </div>
          LinkedIn ↗
        </ContactButton>

        <ContactButton href="https://github.com/masnormen">
          <div className="relative size-18 shrink-0">
            <MdiGithub className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-[39px] text-xstroke transition-colors duration-400 group-hover:text-xblue" />
            <CircleComplete className="h-full w-full text-xblue transition-[translate,rotate,color] duration-400 group-hover:-translate-y-1 group-hover:rotate-180 group-hover:text-xyellow" />
          </div>
          GitHub ↗
        </ContactButton>

        <ContactButton href="/">
          <div className="relative size-18 shrink-0">
            <NotoEyes className="absolute top-0 left-0 translate-x-[47%] translate-y-[45%] text-4xl" />
            <CircleComplete className="h-full w-full text-xcyan transition-[translate,rotate,color] duration-400 group-hover:-translate-y-1 group-hover:rotate-180 group-hover:text-xred" />
          </div>
          What's more?
        </ContactButton>
      </div>
    </Section>
  );
}
