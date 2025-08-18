'use client'

import React, { useState } from 'react'

const ShareModal = ({roomId, collaborartors, createrId, currentUserType} :ShareDocumentDialogProps) => {
    const[open,setOpen] = useState(false)
    const[loading,setLoading] = useState(false)
    
    const[email,setEmail] = useState('')
    const[userType,setUserType] = useState<UserType>('viewer')

    const shareDocumentHandler = async () => {}

  return (
    <div>
      
    </div>
  )
}

export default ShareModal
