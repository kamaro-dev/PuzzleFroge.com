import React from 'react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className }) => {
  const styles = {
    top: 'w-full h-[90px] mb-8',
    bottom: 'w-full h-[250px] mt-8',
    sidebar: 'w-[300px] h-[600px] hidden xl:flex',
  };

  return (
    <div className={cn("ad-placeholder", styles[position], className)}>
      <div className="text-center p-4">
        <p className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">Advertisement</p>
        <p className="text-sm">Place for your ad banner here</p>
        <p className="text-xs opacity-40 mt-1">({position === 'sidebar' ? '300x600' : '728x90'})</p>
      </div>
    </div>
  );
};