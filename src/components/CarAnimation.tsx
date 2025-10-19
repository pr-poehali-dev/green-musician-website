import { useEffect, useState } from 'react';

const CarAnimation = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev >= 100 ? -20 : prev + 0.5));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden py-12 bg-gradient-to-b from-muted/30 to-background">
      <div className="relative h-40">
        <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,50 Q150,30 300,50 T600,50 T900,50 T1200,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-primary/30"
          />
          <path
            d="M0,55 L1200,55"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/20"
            strokeDasharray="20,15"
          />
        </svg>

        <div
          className="absolute transition-all duration-100 ease-linear"
          style={{
            left: `${position}%`,
            bottom: '35px',
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative">
            <svg width="120" height="60" viewBox="0 0 120 60" className="drop-shadow-xl">
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              
              <rect x="25" y="20" width="70" height="25" rx="5" fill="url(#carGradient)" />
              <rect x="35" y="10" width="40" height="15" rx="3" fill="url(#carGradient)" opacity="0.9" />
              
              <circle cx="40" cy="48" r="8" fill="hsl(var(--foreground))" opacity="0.8" />
              <circle cx="40" cy="48" r="5" fill="hsl(var(--muted))" />
              
              <circle cx="80" cy="48" r="8" fill="hsl(var(--foreground))" opacity="0.8" />
              <circle cx="80" cy="48" r="5" fill="hsl(var(--muted))" />
              
              <rect x="38" y="12" width="8" height="8" rx="1" fill="hsl(var(--background))" opacity="0.3" />
              <rect x="48" y="12" width="8" height="8" rx="1" fill="hsl(var(--background))" opacity="0.3" />
              
              <ellipse cx="90" cy="30" rx="4" ry="3" fill="hsl(var(--secondary-foreground))" opacity="0.6" />
              <ellipse cx="94" cy="30" rx="4" ry="3" fill="hsl(var(--secondary-foreground))" opacity="0.6" />
            </svg>
            
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full overflow-hidden border-2 border-secondary shadow-lg"
              style={{ marginTop: '-8px' }}
            >
              <img
                src="https://cdn.poehali.dev/projects/6c479a3b-f230-4b60-9fc3-a32f02789c15/files/d8bb3772-871a-430c-8ef5-f85109c4931c.jpg"
                alt="secondgra2e"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground font-medium">
          🚗 secondgra2e на пути к новым релизам
        </p>
      </div>
    </div>
  );
};

export default CarAnimation;