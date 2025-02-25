import { TokenFetch } from '@/lib/djangoQuery'
import { ProgressDemo } from "../herotext_components/ProgressBar";
import { BackgroundGradientDemo } from './BackgroundGradientDemo'
import { HoverBorderGradientDemo } from './HoverBorderGradientDemo'

function FetchHeroData() {
  return (
    <>
        <BackgroundGradientDemo/>
        <HoverBorderGradientDemo value ="Get Tokens"/>
        <div className=' space-y-2 px-6'>
        <div className='progress_text'>
           <p>Total Progress</p>
           <p>82%</p>
        </div>
           <ProgressDemo setprogress= {82} colorpicker= {"from-white to-blue-400"}/>
           <div className='progress_text'>
           <p>0 𝕏</p>
           <p>10M 𝕏</p>
        </div>
        </div>   
    </>
  )
}

export default FetchHeroData