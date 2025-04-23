import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'
import {motion} from 'framer-motion'

const TestimonialSection = () => {

  const testimonialRepeat = [...dummyTestimonial]

  return (
    <motion.div
     className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='text-base text-gray-500 mt-3'>Hear from our learners as they share their journeys of transformation, success, and how <br /> our platform has made a difference in their lives.</p>
      <motion.div
      //  animate={{
      //               x: ['-50%', '50%'],
      //               transition: {
      //                   ease: 'linear',
      //                   duration: 8,
      //                   repeat: Infinity,
      //               }
      //           }}
       className='grid overflow-hidden g gap-5 mt-10' style={{'gridTemplateColumns':'repeat(auto-fit, minmax(200px, 1fr))'}}>
        {
          testimonialRepeat.map((testimonials, index) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
             key={index} className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px-4px-15px-0px] overflow-hidden shadow-black-5'>
              <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
                  <img className='h-12 w-12 rounded-full' src={testimonials.image} alt="testimonial-image" />
                  <div>
                    <h1 className='text-lg font-medium text-gray-800'>{testimonials.name}</h1>
                    <p className='text-gray-800/80 '>{testimonials.role}</p>
                  </div>
              </div>
              <div className='p-5 pb-7'>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((el, i) => (
                        <img key={i} src={i < Math.floor(testimonials.rating) ? assets.star : assets.star_blank} alt="star-image" className='h-5' />
                      ))}
                    </div>
                    <p className='text-gray-500 mt-5'>{testimonials.feedback}</p>
              </div>
                  <a href="#" className='text-blue-500 border-b ml-5'>Read more</a>
            </motion.div>
          ))
        }
      </motion.div>
    </motion.div>
  )
}

export default TestimonialSection
