'use client';

import React, { useEffect, useState } from 'react';
import { useLottie } from 'lottie-react';

interface LazyAnimationPlayerProps {
  animationType: 'search' | 'greenboard';
  width?: string;
  height?: string;
}

const LazyAnimationPlayer: React.FC<LazyAnimationPlayerProps> = ({ 
  animationType, 
  width = '100%', 
  height = '300px' 
}) => {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLoading(true);
        let data;
        
        if (animationType === 'search') {
          data = await import('../../assets/search-animation.json');
        } else if (animationType === 'greenboard') {
          data = await import('../../assets/greenboard-animation.json');
        }
        
        setAnimationData(data?.default || data);
      } catch (err) {
        console.error('Failed to load animation:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnimation();
  }, [animationType]);

  const options = {
    animationData,
    loop: true,
  };

  const { View } = useLottie(options);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center rounded-lg animate-pulse"
        style={{ width, height }}
      >
        <div className="text-white text-lg">Loading animation...</div>
      </div>
    );
  }

  if (error || !animationData) {
    return (
      <div
        className="flex items-center justify-center rounded-lg border border-white/10"
        style={{ width, height }}
      >
        <div className="text-gray-300 text-lg">Animation unavailable</div>
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      {View}
    </div>
  );
};

export default LazyAnimationPlayer; 