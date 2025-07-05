import React from 'react';

const TipsIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8.68629 2 6 4.68629 6 8C6 10.2913 7.12122 12.2745 8.87469 13.5244L8.5 14H15.5L15.1253 13.5244C16.8788 12.2745 18 10.2913 18 8C18 4.68629 15.3137 2 12 2Z" fill="#facc15"/>
        <rect x="8" y="16" width="8" height="2" rx="1" fill="currentColor"/>
        <rect x="10" y="18" width="4" height="2" rx="1" fill="currentColor"/>
    </svg>
);

export default TipsIcon;