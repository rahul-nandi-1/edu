import React from 'react'
import { assets } from '../../assets/assets'
import {motion} from 'framer-motion'

const companyImage = [
  {logo:assets.microsoft_logo, alt:"microsoft_logo"},
  {logo:assets.walmart_logo, alt:"wallmart_logo"},
  {logo:assets.accenture_logo, alt:"accenture_logo"},
  {logo:assets.adobe_logo, alt:"adobe_logo"},
  {logo:assets.paypal_logo, alt:"paypal_logo"},
]

const Companies = () => {
  return (
    <div className='pt-16'>
      <p className='text-base text-gray-500'>Trusted by learners from</p>
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>
      {companyImage.map((element, index) => (
        <motion.img
        key={index}
        whileHover={{y:-10}}
        whileTap={{scale:0.8}}
         src={element.logo} alt={element.alt} className='w-20 md:w-28' />
      ))}
      </div>
    </div>
  )
}

export default Companies
