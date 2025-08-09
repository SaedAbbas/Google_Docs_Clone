'use client'
import {ClientSideSuspense, LiveblocksProvider} from '@liveblocks/react/suspense' 
import Loader from '@/components/Loader'
import { ReactNode } from 'react'

const Provider = ({children}:{children:ReactNode}) => {
  return (
    //السبب إنه استخدم authEndpoint بدل المفتاح العام هو الأمان، عشان ما ينكشف مفتاحك السري في المتصفح.
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth'>
        <ClientSideSuspense fallback={<Loader />}>
          {children}
        </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider
