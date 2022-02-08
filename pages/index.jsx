import Head from 'next/head'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <main className='flex justify-center flex-col max-w-[1000px] mx-auto mb-20 gap-y-4'>
        <div className='text-center bg-white w-full p-8 rounded-lg'>
          <h1 className='text-5xl font-bold '>
            Welcome to Tecna Natural Disaster Guide
          </h1>
        </div>
        <div className=' mx-auto'>
          <Carousel autoPlay className='bg-white'>
            <div>
              <img src='/images/home/earthquake_1.jpg ' alt='Picture of an Earthquake'></img>
              <p className='legend'>Picture of an earthquake by Zurich Insurance</p>
            </div>
            <div>
              <img src='/images/home/volcano.webp' alt='Picture of a volcano'></img>
              <p className='legend'>Picture of a volcano by National Geography</p>
            </div>
            <div>
              <img src='/images/home/floods_1.jpg' alt='Picture of a flood'></img>
              <p className='legend'>Picture of floods by National Geography</p>
            </div>
            <div>
              <img src='/images/home/drought.jpg' alt='Picture of a drought'></img>
              <p className='legend'>Picture of droughts by National Geography</p>
            </div>
          </Carousel>
        </div>
        <div className='bg-white rounded-lg'>
          <div className='text-center font-bold text-3xl pt-5'>
            Our Highlights
          </div>
          <div class="sm:flex flex-wrap justify-center items-center pb-5 text-center gap-8">
            <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6  shadow-lg rounded-lg dark:bg-gray-800">
              <div class="flex-shrink-0">
                <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
                Informational
              </h3>
              <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
                The goal of our website was to condense informational content within the span of a couple of pages so you could be informed on what to do in a worst case scenario.D
              </p>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 mt-6 sm:mt-16 md:mt-20 lg:mt-24 bg-white shadow-lg rounded-lg dark:bg-gray-800">
              <div class="flex-shrink-0">
                <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
              </div>
              <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
                Communication
              </h3>
              <p class="text-md text-gray-500 dark:text-gray-300 py-4">
                We have a forum available to everyone, where you can share your thoughts and any advice you may hold, while others do the same, creating a community around the world.
              </p>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-white shadow-lg rounded-lg dark:bg-gray-800">
              <div class="flex-shrink-0">
                <div class="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <h3 class="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
                Alerts
              </h3>
              <p class="text-md  text-gray-500 dark:text-gray-300 py-4">
                Stay alerted with our Alerts page that gives you the latest news on natural disasters all around the world.
              </p>
            </div>
          </div>
        </div>
        <div className='bg-white p-5 flex gap-y-4 rounded-lg flex-col'>
          <div>
            <h1 className='text-3xl text-center font-bold'>
              Map of the site
            </h1>
          </div>

          {
            mapOfSite.map((doc) => (
              <MapCard obj={doc} />
            ))
          }

        </div>
      </main>
    </div>
  )
}

const mapOfSite = [
  {
    name: 'Alerts',
    href: '/alert',
    description: 'This page will let you go through recent disaster warnings, along with the latest news regarding disasters.'
  },
  {
    name:'Guide',
    href:'/guide',
    description: 'Here you can read up on what to do in the case of a disaster. It provides you links to the official site of the US Government, giving you instructions in a concise manner.'
  },
  {
    name: 'Discussion',
    href: '/discussion',
    description: 'We have a discussion forum where you can give thoughts, opinions, and advices on topics relating to natural disasters and with features like commenting, the discussion can scale infinitely.'
  },
  {
    name: 'Donate / Support',
    href: '/donate',
    description: 'Here you\'ll find links related to donating and volunteering. We\'ve provided links to very famous sites you can visit and trustfuly donate to.'
  },
  {
    name: 'Citations',
    href: '/guide/citations',
    description: 'An informative site couldn\'t be built alone! We\'ve sited major sources that we have used to gather information from.'
  }
]


function MapCard(props) {
  const obj = props.obj

  return (
    <Link href={obj.href}>
      <a >
        <div className='hover:bg-gray-50 p-3 rounded-lg'>
          <h1 className='text-2xl font-semibold'>
            {obj.name}
          </h1>
          <p className='text-xl'>
            {obj.description}
          </p>
        </div>

      </a>
    </Link >
  )
}