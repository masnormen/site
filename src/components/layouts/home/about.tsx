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
      <div className="space-y-5 text-sm lg:text-base leading-[1.6]">
        <div className="group relative size-[220px] md:size-[250px] aspect-square isolate mx-auto sm:mx-0 sm:-mt-16 sm:float-right sm:ml-6 sm:mb-6 md:ml-15">
          <img
            src="/assets/images/portrait.webp"
            className="h-full w-full aspect-square relative z-10 rounded-full border-2 border-xbg shadow-lg group-hover:scale-98 group-hover:rotate-6 group-hover:shadow-2xl transition-all duration-400 "
            draggable="false"
          />
          <WingishShape className="absolute w-full h-full inline-block top-[1%] -left-[5%] scale-104 z-0 text-xyellow -rotate-24 group-hover:-rotate-45 group-hover:-top-[1%] group-hover:text-xbg transition-all duration-400" />
          <WingishShape className="absolute w-full h-full inline-block top-[1%] -left-[5%] scale-104 z-0 text-xyellow -rotate-24 group-hover:rotate-0 group-hover:-top-[1%] group-hover:text-xblue transition-all duration-400" />
        </div>
        <p className="first-letter:font-serif first-letter:font-bold first-letter:text-[48px] first-letter:leading-[1] first-letter:float-left first-letter:mr-3">
          I grew up surrounded by computers. Wrote my first blog at 9yo,
          installed Arch Linux (yes, the manual way) on my laptop at 11, and
          shipped my first real code at 13. Basically, I've carried the love for
          programming with me all my life, and became a Software Engineer.
        </p>
        <p>
          Alongside my work, I'm currently pursuing a Master's in Cybersecurity
          at Monash University on weekends. (<strong>Fun fact</strong>: this was
          made possible by a scholarship from a literal 😼 cat meme{' '}
          <Tooltip>
            <TooltipTrigger className="cursor-pointer">
              <a
                className="text-xblue underline decoration-1 underline-offset-2"
                href="https://www.instagram.com/ecommurz/"
                target="_blank"
                rel="noopener noreferrer"
              >
                account
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>@ecommurz on Instagram ↗</p>
            </TooltipContent>
          </Tooltip>
          ).
        </p>

        <div className="relative hidden sm:flex items-center justify-center float-left w-[30%] h-[clamp(150px,calc(200px+(1000px-100vw)*0.05),400px)] mr-6 clear-both">
          <img
            src="/assets/images/floral-red-blue.png"
            className="size-[128px] rotate-[-27deg] hover:rotate-[28deg] transition-transform"
            draggable="false"
          />
        </div>

        <p className="clear-right">
          My go-to tools for work are TypeScript and React, but I'm a pragmatic
          engineer at heart. I'm comfortable moving between frameworks and
          languages, like Svelte, Go, Python, Rust, PHP, or whatever tool is
          best suited to solve the problem at hand. New tools are a welcome fun
          challenge!
        </p>
        <p>
          Currently, I'm based in Jakarta, Indonesia. Having been raised
          multilingually in Indonesian and Javanese, I’m also a fluent English
          speaker and have picked up some conversational Japanese (still
          practicing!).
        </p>
      </div>
    </Section>
  );
}
