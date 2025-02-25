"use client";

import FetchHeroData from "./herotext_components/FetchHeroData";
import { TextGenerateEffect } from "./herotext_components/text-generate-effect";

const words = `Join the future of digital finance with the official X token presale platform`;
function Index() {

    
  return (
    <div className="absolute lg:mt-32 top-4  min-sm:top-0 w-full h-full flex flex-col item-center justify-center overflow-hidden z-30 ">
        <div className="max-w-3xl w-full mx-auto text-center">
      <h1
        className="bg-clip-text text-transparent text-[2rem] min-sm:text-[3rem] md:text-[4.5rem] font-extrabold
                   bg-gradient-to-r from-white via-blue-400 to-white 
                   bg-[length:200%_200%] animate-gradient-move"
      >
        X Token Presale
      </h1>
      <TextGenerateEffect words={words} />
      <FetchHeroData/>
   
      </div>
    </div>
  );
}

export default Index;