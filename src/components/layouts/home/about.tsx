import { WingishShape } from '@/components/assets/shapes/misc';
import { Section } from '@/components/layouts/section';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
          src="/assets/images/x-yellow-blue.png"
          className="w-[70%] h-[70%] rotate-[25deg] hover:rotate-[-40deg] translate-x-[10%] translate-y-[20%] hover:scale-120 transition-transform"
          draggable="false"
        />
      }
    >
      <div className="block h-full space-y-5 text-sm lg:text-base leading-[1.6]">
        <div className="group h-full relative size-[220px] md:size-[250px] aspect-square isolate mx-auto sm:mx-0 sm:-mt-16 sm:float-right sm:ml-6 sm:mb-6 md:ml-8">
          <img
            src="/assets/images/portrait.webp"
            className="h-full w-full aspect-square relative z-10 rounded-full border-2 border-xbg shadow-lg group-hover:scale-98 group-hover:rotate-6 group-hover:shadow-2xl transition-all duration-400 "
            draggable="false"
          />
          <WingishShape className="absolute w-full h-full inline-block top-[1%] -left-[5%] scale-104 z-0 text-xyellow -rotate-24 group-hover:-rotate-45 group-hover:-top-[1%] group-hover:text-xbg transition-all duration-400" />
          <WingishShape className="absolute w-full h-full inline-block top-[1%] -left-[5%] scale-104 z-0 text-xyellow -rotate-24 group-hover:rotate-0 group-hover:-top-[1%] group-hover:text-xblue transition-all duration-400" />
        </div>
        <p>
          I grew up surrounded by computers. I wrote my first blog at 9yo,
          installed Arch Linux at 11 (yes, the manual way), and shipped my first
          code at 13. Now based in Jakarta, I speak Indonesian, English, and
          Javanese with some conversational Japanese under my belt (still
          practicing!).
        </p>
        <p>
          My go-to tools are TypeScript and React, but I'm a pragmatic engineer
          at heart 🧐. I'm comfortable moving between frameworks and languages,
          like Svelte, Go, Python, Rust, PHP, or whatever tool is best suited to
          solve the problem at hand. New tools are a welcome fun challenge! 🛠️
        </p>
        <p>
          I'm currently expanding my skills by pursuing a Master's in
          Cybersecurity at Monash University. (<b>fun fact:</b> all this was
          made possible by a scholarship from a literal 😼 cat{' '}
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
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
