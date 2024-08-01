import React from 'react';

type PropsIcon = {
   Icon: any;
   color?: string;
   className?: string;
   width?: string;
   height?: string;
};

const IconType = ({ Icon, color, className, width, height }: PropsIcon) => {
   return <Icon color={color || 'gray'} className={className} width={width || '16px'} height={height || '16px'} />;
};

export default IconType;
