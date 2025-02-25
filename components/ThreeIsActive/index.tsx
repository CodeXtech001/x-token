"use client"

import { threeisActive } from '@/lib/contents'
import SectionHeader from "../SectionHeader"
import { ProgressDemo } from '../HeroText/herotext_components/ProgressBar'
import { HoverBorderGradientDemo } from '../HeroText/herotext_components/HoverBorderGradientDemo'
import { GlowingEffectDemo } from './three_component/GlowingEffectDemo'
import { setActiveSection } from '@/app/features/counter/scrollSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { cn } from '@/lib/utils'

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
    <div className='mt-43 md:mt-50 max-w-[1500px] w-full mx-auto'>
        <div id='Features' className={cn("",{"": activeSection === "Features"})}/>
        <SectionHeader {...threeisActive}/>
        <div className='flex flex-col md:flex-row justify-between md:items-center gap-8 mt-12 md:mt-16'>
            <div className='space-y-2 px-8'>
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
              <ProgressDemo setprogress= {82} colorpicker= {" from-blue-500 via-purple-500 to-blue-500"}/>
            </div>
            <div>
            <HoverBorderGradientDemo value ="Buy Now"/>
            </div>
        </div>
       <GlowingEffectDemo {...threeisActive}/>
    </div>
  )
}

export default index