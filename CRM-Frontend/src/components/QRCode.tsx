import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ text }: { text: string }) => {
   return (
      <QRCode
         includeMargin={true}
         size={100}
         level='H'
         //  imageSettings={{
         //     src: '/logoINSS.png',
         //     x: undefined,
         //     y: undefined,
         //     height: 34,
         //     width: 34,
         //     excavate: true
         //  }}
         value={text}
      />
   );
};

export default QRCodeComponent;
