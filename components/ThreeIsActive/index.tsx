"use client"

import { threeisActive } from '@/lib/contents'
import SectionHeader from "../SectionHeader"
import { ProgressDemo } from '../HeroText/herotext_components/ProgressBar'
import { GlowingEffectDemo } from './three_component/GlowingEffectDemo'
import { setActiveSection } from '@/app/features/scroll/scrollSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'

function index() {

  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.scroll.activeSection); 

  useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            dispatch(setActiveSection("Features"));
          }
        },
        { threshold: 0.5 }
      );
  
      const element = document.getElementById("Features");
      if (element) observer.observe(element);
  
      return () => {
        if (element) observer.unobserve(element);
      };
    }, [dispatch]);

  return (
    <div className='mt-43 md:mt-50 max-w-6xl w-full mx-auto'>
        <div id='Features' className={cn("",{"": activeSection === "Features"})}/>
        <SectionHeader {...threeisActive}/>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-center gap-8 mt-12 md:mt-16 px-2'>
            <div className='space-y-2 px-8 md:px-0'>
            <p className='progress_text'>Current Price</p>
            <h3 className='text-3xl font-bold'>
              1 𝕏 = $
                5.44
                USD
            </h3>
            </div>
            <div className='flex-1 w-full px-8 space-y-2'>
              <div className='flex justify-between'>
              <p className='progress_text'>Progress</p>
              <p className='progress_text'>82%</p>
              </div>
              <ProgressDemo setprogress= {82} colorpicker= "from-blue-500 via-purple-500 to-blue-500"/>
            </div>
            <div className='flex justify-center z-20'>
            <Link href="/buytoken" className={`${buttonVariants()} text-white font-light px-8 mt-[10%] text-transparent bg-gradient-to-r from-blue-500 via-purple-500  to-blue-500 bg-[length:200%_200%] animate-gradient-move border border-blue-300/60 hover:border-blue-300 group/button`}><span className="text-white">Buy Now</span><ChevronRight className="w-6 h-6 group-hover/button:translate-x-4 transition-all duration-300 ease-in-out text-white"/></Link>
            {/* <HoverBorderGradientDemo value ="Buy Now"/> */}
            </div>
        </div>
       <GlowingEffectDemo {...threeisActive}/>
    </div>
  )
}

export default index