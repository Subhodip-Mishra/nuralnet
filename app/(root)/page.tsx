import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { navLinks } from '../constants'
import Link from 'next/link'
import Image from 'next/image'
import { Collection } from '@/components/shared/Collection'
import { getAllImages } from '@/lib/actions/image.actions'

const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';

  const images = await getAllImages({ page, searchQuery })

  return (
    <>
      <section className='bg-[#0e0427] flex flex-col items-center justify-center rounded-3xl gap-5 pb-6 pt-5 '>

        {/* <h1 className='home-heading '>Unleash Your Creativity with Crip AI</h1> */}

        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-800 via-30% to-blue-700 to-90% blur-3xl"></div>
          <h1 className="relative home-heading mb-2 text-white">Unleash Your Creativity with Crip AI</h1>
        </div>

        <ul className='flex-center w-full gap-3 '>
          {navLinks.slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className='flex-center felx-col gap-2 '
            >
              <li className='flex items-center  justify-center rounded-full bg-gradient-to-b from-[#7f40fd] via-[#1e13fe] to-[#0ced63] py-1 px-1 ring-offset- bg-indigo-500 shadow-lg shadow-indigo-400/95 opacity-100 drop-shadow-md   '>
                <div className='w-12 h-12  bg-black flex items-center justify-center border-10 rounded-full cursor-pointer  '>
                  <Image className='w-6 h-6  ' src={link.icon} alt='image' width={18} height={18} />
                </div>
              </li>
              <p className='p-14-medium text-center text-zinc-200'>{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>

      <section className='sm:mt-12'>
        <Collection
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPages}
          page={page}
        />
      </section>
    </>
  )
}

export default Home