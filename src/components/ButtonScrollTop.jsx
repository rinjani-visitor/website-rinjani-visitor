'use client'
import React, { useState, useEffect } from 'react';
import { CaretUp } from '@phosphor-icons/react';

const ButtonScrollTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`right-4 bottom-4 fixed ${isVisible ? '' : 'opacity-0'} transition-all`}>
      <button onClick={scrollTop} className="flex items-center text-xs">
        Back to Top <CaretUp size={20} color="#234342" />
      </button>
    </div>
  );
};

export default ButtonScrollTop;
