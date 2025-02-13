import { threeisActive } from '@/lib/contents'
import SectionHeader from "../SectionHeader"
import { ProgressDemo } from '../HeroText/herotext_components/ProgressBar'
import { HoverBorderGradientDemo } from '../HeroText/herotext_components/HoverBorderGradientDemo'
import { GlowingEffectDemo } from './three_component/GlowingEffectDemo'

function index() {
  return (
    <div className='mt-32 md:mt-40 max-w-[1500px] w-full mx-auto'>
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