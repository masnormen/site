import { Icon } from '@iconify/react';

import { CircleComplete, CircleIncomplete } from '@/components/assets/shapes/circles';
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
          className="h-full w-full rotate-[45deg] transition-transform hover:scale-120 hover:rotate-[-20deg]"
          draggable="false"
          loading="lazy"
          alt=""
        />
      }
      className="border-b-0"
    >
      <div className="grid grid-flow-row grid-cols-2 grid-rows-[auto_1fr_1fr] gap-2 sm:gap-4 lg:grid-cols-4 lg:grid-rows-[auto_1fr] xl:grid-flow-col xl:grid-cols-[auto_1fr_1fr] xl:grid-rows-2">
        <div className="group/card relative z-0 col-span-2 lg:col-span-4 xl:col-span-1 xl:row-span-2">
          <div className="relative z-10 flex h-full w-full flex-col justify-between rounded-cxl bg-xbg p-8 text-center">
            <div className="text-left font-title text-lg text-pretty lg:text-2xl">
              Wanna{' '}
              <span className="text-xblue transition-all duration-400 group-hover/card:font-semibold">
                work together
              </span>{' '}
              or have{' '}
              <span className="text-xblue transition-all duration-400 group-hover/card:font-semibold">an idea</span>{' '}
              you'd like to{' '}
              <span className="text-xblue transition-all duration-400 group-hover/card:font-semibold">discuss</span>
              ?
              <SpringyArrow className="mt-3 ml-3 inline-flex h-auto w-[28px] align-top text-xred md:w-[53px]" />
            </div>

            <div className="flex flex-row items-center justify-between gap-4">
              <WavyGrass className="block w-[150px] min-w-1/3 text-xyellow transition-all duration-400 group-hover/card:text-xcyan" />
              <div className="w-min text-left font-title text-[max(1.5rem,8cqw)] leading-[1.15] font-bold text-xblue uppercase transition-all duration-400 group-hover/card:text-xred md:text-[52px]">
                Let's Connect
              </div>
            </div>
          </div>

          <KiteishShape className="absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 text-xred transition-all duration-400 group-hover/card:rotate-6 group-hover/card:text-xarrow lg:block" />
          <KiteishShape className="absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 text-xred transition-all duration-400 group-hover/card:-rotate-12 group-hover/card:text-xyellow lg:block" />
        </div>

        <ContactButton href="https://cal.com/nourman">
          <div className="relative hidden size-16 sm:block">
            <Icon
              icon="mingcute:calendar-2-fill"
              className="absolute top-0 left-0 translate-x-[35%] translate-y-[35%] text-4xl text-xpink transition-colors duration-400 group-hover:text-xred"
            />
            <Icon
              icon="mdi:video"
              className="absolute top-0 left-0 translate-x-[170%] translate-y-[170%] text-xl text-xblue transition-colors duration-400 group-hover:text-xyellow"
            />
            <CircleIncomplete className="h-full w-full text-xstroke transition-all duration-400 group-hover:rotate-180 group-hover:text-xblue" />
          </div>
          Book a Call ↗
        </ContactButton>

        <ContactButton href="https://www.linkedin.com/in/nourmanhajar">
          <div className="relative hidden size-18 sm:block">
            <Icon
              icon="mdi:linkedin"
              className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-[39px] text-xblue transition-colors duration-400 group-hover:text-xstroke"
            />
            <CircleComplete className="h-full w-full -translate-y-1 rotate-180 text-xyellow transition-all duration-400 group-hover:rotate-0 group-hover:text-xpink" />
          </div>
          LinkedIn ↗
        </ContactButton>

        <ContactButton href="https://github.com/masnormen">
          <div className="relative hidden size-18 sm:block">
            <Icon
              icon="mdi:github"
              className="absolute top-0 left-0 translate-x-[40%] translate-y-[35%] text-[39px] text-xstroke transition-colors duration-400 group-hover:text-xblue"
            />
            <CircleComplete className="h-full w-full text-xblue transition-all duration-400 group-hover:-translate-y-1 group-hover:rotate-180 group-hover:text-xyellow" />
          </div>
          GitHub ↗
        </ContactButton>

        <ContactButton href="/">
          <div className="relative hidden size-18 sm:block">
            <Icon icon="noto:eyes" className="absolute top-0 left-0 translate-x-[47%] translate-y-[45%] text-4xl" />
            <CircleComplete className="h-full w-full text-xcyan transition-all duration-400 group-hover:-translate-y-1 group-hover:rotate-180 group-hover:text-xred" />
          </div>
          What's more?
        </ContactButton>
      </div>
    </Section>
  );
}
