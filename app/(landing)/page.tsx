import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const LandingPage = () => {
  return (
    <div >
      LandingPage (Protected)
      <div className='flex items-center justify-center flex-col-12'>
        <div className='flex gap-4 p-4 justify-start'>
        <Link href={'/sign-in'}>
        <Button>
          Login
        </Button>
        </Link>
        </div>
        <div className='gap-3 p-4 flex items-center  '>
        <Link href={'/sign-up'}>
        <Button>
          Register
        </Button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage