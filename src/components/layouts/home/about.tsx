import { WingishShape } from '@/components/assets/shapes/misc';
import { Section } from '@/components/layouts/section';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function About() {
  return (
    <Section
      id="about"
      title={
        <>
          Behind the <span className="text-xblue">Code</span>
        </>
      }
      icon={
        <img
          src="/assets/images/x-yellow-blue.webp"
          className="h-[70%] w-[70%] translate-x-[10%] translate-y-[20%] rotate-[25deg] transition-transform hover:scale-120 hover:rotate-[-40deg]"
          draggable="false"
          loading="lazy"
          alt=""
        />
      }
    >
      <div className="block h-full space-y-5 text-sm leading-[1.6] lg:text-base">
        <div className="group relative isolate mx-auto aspect-square size-[220px] h-full sm:float-right sm:mx-0 sm:-mt-16 sm:mb-6 sm:ml-6 md:ml-8 md:size-[250px]">
          <img
            src="/assets/images/portrait.webp"
            className="relative z-10 aspect-square h-full w-full rounded-full border-2 border-xbg shadow-lg transition-[scale,rotate,box-shadow] duration-400 group-hover:scale-98 group-hover:rotate-6 group-hover:shadow-2xl "
            draggable="false"
            loading="lazy"
            alt="My portrait"
          />
          <WingishShape className="absolute top-[1%] -left-[5%] z-0 inline-block h-full w-full scale-104 -rotate-24 text-xyellow transition-[translate,rotate,color] duration-400 group-hover:-translate-y-[2%] group-hover:-rotate-45 group-hover:text-xbg" />
          <WingishShape className="absolute top-[1%] -left-[5%] z-0 inline-block h-full w-full scale-104 -rotate-24 text-xyellow transition-[translate,rotate,color] duration-400 group-hover:-translate-y-[2%] group-hover:rotate-0 group-hover:text-xblue" />
        </div>
        <p>
          I grew up surrounded by computers. I wrote my first blog at 9yo, installed Arch Linux at 11 (yes, the manual
          way), and shipped my first code at 13. Now based in Jakarta, I speak Indonesian, English, and Javanese with
          some conversational Japanese under my belt (still practicing!).
        </p>
        <p>
          My go-to tools are TypeScript and React, but I'm a pragmatic engineer at heart. I've shipped for SaaS
          startups, large e-commerce, e-government, and software houses, so I'm comfortable moving between patterns,
          frameworks, and languages like Go, Python, Rust, or PHP. I build AI-native, and I care as much about sound
          architecture and developer experience as how things look and feel.
        </p>
        <p>
          Outside of working as a Software Engineer, I'm currently pursuing a Master's in Cybersecurity at Monash
          University. (<b>fun fact:</b> all this was made possible by a scholarship from a literal cat{' '}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                className="link font-semibold"
                href="https://www.instagram.com/ecommurz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                meme account
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>@ecommurz on Instagram ↗</p>
            </TooltipContent>
          </Tooltip>
          ).
        </p>
      </div>
    </Section>
  );
}
