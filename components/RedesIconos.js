import React from 'react';
import Image from 'next/image'
import { 
         WhatsappShareButton, 
         EmailShareButton, 
         TelegramShareButton,
         TwitterShareButton } from 'react-share';

export default function RedesIconos({ url }) {
  return (
  <div className='flex gap-2 mb-3'>
    <EmailShareButton url={url}>
      <Image src='/redes/email.png' width={36} height={36} alt='imagen del icono email' />
    </EmailShareButton>
    <WhatsappShareButton url={url}>
      <Image src='/redes/whatsapp.png' width={36} height={36} alt='imagen del icono de whatsapp'/>
    </WhatsappShareButton>
    <TwitterShareButton url={url}>
      <Image src='/redes/twitter.png' width={36} height={36} alt='imagen del icono de twitter'/>
    </TwitterShareButton>
    <TelegramShareButton url={url}>
      <Image src='/redes/telegram.png' width={36} height={36} alt='imagen del icono de telegram'/>
    </TelegramShareButton>
  </div>
  )
};


