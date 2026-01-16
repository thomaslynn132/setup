import { useState } from 'react';

interface ImageWithLoadingStateProps {
   src: string;
   alt: string;
   className?: string;
}

export default function ImageWithLoadingState({
   src,
   alt,
   className,
}: Readonly<ImageWithLoadingStateProps>) {
   const [loading, setLoading] = useState(true);

   return (
      <div className='relative'>
         {loading && <div className={className}>Loading...</div>}

         <img
            src={src}
            alt={alt}
            className={`${className} transition-opacity duration-1000 ${
               loading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
         />
      </div>
   );
}
