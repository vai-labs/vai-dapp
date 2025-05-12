import React from 'react';
import NextImage from 'next/image';
import { StaticImageData } from 'next/image';

/**
 * Custom Image component that wraps Next.js Image component
 * Properly handles the fetchpriority attribute and converts it to priority prop
 */
interface CustomImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fetchpriority?: 'high' | 'low' | 'auto'; // lowercase version for HTML compliance
  [key: string]: any; // Allow additional props
}

const Image: React.FC<CustomImageProps> = ({
  src, 
  alt, 
  width, 
  height, 
  className, 
  fetchpriority,
  ...rest
}) => {
  // Map the fetchpriority attribute to the priority prop
  // Use priority for high fetchpriority
  const priority = fetchpriority === 'high';
  
  // Create a safe props object, removing any properties that might cause warnings
  const safeProps = { ...rest };
  
  // Return the NextImage component with properly mapped props
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      {...safeProps}
    />
  );
};

export default Image;