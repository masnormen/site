import { Icon } from '@iconify/react';
import {
  CircleComplete,
  CircleIncomplete,
} from '@/components/assets/shapes/circles';
import { SpringyArrow, WavyGrass } from '@/components/assets/shapes/lines';
import { KiteishShape } from '@/components/assets/shapes/misc';
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
        <img
          src="/assets/images/floral-pink-blue.png"
          className="w-full h-full rotate-[45deg] hover:rotate-[-20deg] hover:scale-120 transition-transform"
          draggable="false"
        />
      }
      className="border-b-0"
    >
      <div className="grid grid-flow-row grid-rows-[auto_1fr_1fr] grid-cols-2 lg:grid-rows-[auto_1fr] lg:grid-cols-4 xl:grid-flow-col xl:grid-cols-[auto_1fr_1fr] xl:grid-rows-2 gap-2 sm:gap-4">
        <div className="group/card z-0 relative col-span-2 lg:col-span-4 xl:col-span-1 xl:row-span-2">
          <div className="flex flex-col justify-between rounded-cxl bg-xbg p-8 text-center h-full w-full z-10 relative">
            <div className="font-title text-lg lg:text-2xl text-pretty text-left">
              Wanna{' '}
              <span className="text-xblue group-hover/card:font-semibold transition-all duration-400">
                work together
              </span>{' '}
              or have{' '}
              <span className="text-xblue group-hover/card:font-semibold transition-all duration-400">
                an idea
              </span>{' '}
              you'd like to{' '}
              <span className="text-xblue group-hover/card:font-semibold transition-all duration-400">
                discuss
              </span>
              ?
              <SpringyArrow className="inline-flex w-[28px] h-auto md:w-[53px] align-top mt-3 ml-3 text-xred" />
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <WavyGrass className="block min-w-1/3 text-xyellow w-[150px] group-hover/card:text-xcyan transition-all duration-400" />
              <div className="w-min text-[max(1.5rem,8cqw)] md:text-[52px] font-title font-bold leading-[1.15] text-left text-xblue uppercase group-hover/card:text-xred transition-all duration-400">
                Let's Connect
              </div>
            </div>
          </div>

          <KiteishShape className="hidden lg:block absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xred group-hover/card:text-xarrow group-hover/card:rotate-6 transition-all duration-400" />
          <KiteishShape className="hidden lg:block absolute z-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xred group-hover/card:text-xyellow group-hover/card:-rotate-12 transition-all duration-400" />
        </div>

        <ContactButton href="https://cal.com/nourman">
          <div className="hidden sm:block relative size-16">
            <Icon
              icon="mingcute:calendar-2-fill"
              className="absolute top-0 left-0 translate-x-[35%] translate-y-[35%] text-xpink group-hover:text-xred text-4xl transition-colors duration-400"
            />
            <Icon
              icon="mdi:video"
              className="absolute top-0 left-0 translate-x-[170%] translate-y-[170%] text-xblue group-hover:text-xyellow text-xl transition-colors duration-400"
            />
            <CircleIncomplete className="text-xstroke group-hover:rotate-180 group-hover:text-xblue w-full h-full transition-all duration-400" />
          </div>
          Book a Call ↗
        </ContactButton>

        <ContactButton href="https://www.linkedin.com/in/nourmanhajar">
          <div className="hidden sm:block relative size-18">
            <Icon
              icon="mdi:linkedin"
              className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-xblue group-hover:text-xstroke text-[39px] transition-colors duration-400"
            />
            <CircleComplete className="text-xyellow rotate-180 group-hover:rotate-0 group-hover:text-xpink -translate-y-1 w-full h-full transition-all duration-400" />
          </div>
          LinkedIn ↗
        </ContactButton>

        <ContactButton href="https://github.com/masnormen">
          <div className="hidden sm:block relative size-18">
            <Icon
              icon="mdi:github"
              className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-xstroke group-hover:text-xblue text-[39px] transition-colors duration-400"
            />
            <CircleComplete className="text-xblue group-hover:rotate-180 group-hover:text-xyellow group-hover:-translate-y-1 w-full h-full transition-all duration-400" />
          </div>
          GitHub ↗
        </ContactButton>

        <ContactButton href="/">
          <div className="hidden sm:block relative size-18">
            <Icon
              icon="noto:eyes"
              className="absolute top-0 left-0 translate-x-[47%] translate-y-[45%] text-4xl"
            />
            <CircleComplete className="text-xcyan group-hover:rotate-180 group-hover:text-xred group-hover:-translate-y-1 w-full h-full transition-all duration-400" />
          </div>
          What's more?
        </ContactButton>
      </div>
    </Section>
  );
}
