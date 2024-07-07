import React from 'react'
import Image from 'next/image'

function Hero() {
    return (
            <div className='flex flex-row m-9  text-lg' >
            <Image className='rounded-md brightness-100'
                src="/i2.jpeg"
                width={400}
                height={400}
                alt="main_img"
            /> 
            <div className='pt-9 ml-10 pr-20 text-1xl text-white'>
            <p className='pb-5'>
                Welcome to Jimbro, your premier AI-powered fitness companion. Jimbro is designed to revolutionize your fitness journey with personalized workout plans, real-time feedback, and comprehensive progress tracking. Whether you're a fitness novice or an experienced athlete, Jimbro tailors every session to your unique needs and goals.
            </p>
            <p className='pb-5'>
                Our advanced AI technology continuously adapts to your performance, ensuring you get the most effective and enjoyable workouts. Stay motivated with dynamic routines, expert guidance, and a supportive community. Track your progress effortlessly and watch as you achieve milestones you never thought possible.
            </p>
            <p className='pb-5'>
                Jimbro isn't just a fitness app; it's your dedicated partner in achieving a healthier, stronger, and more confident you. Ready to transform your fitness journey? Join Jimbro today and start reaching your goals with personalized support and cutting-edge technology. Your best self is just a tap away. Let's get started!
            </p>
            </div> 
        </div>
    )
}

export default Hero