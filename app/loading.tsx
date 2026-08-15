'use client'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-(--color-monk-dark)">
      <div className="relative w-17.5 aspect-square">
        {/* outer ring */}
        <span className="absolute inset-0 rounded-full animate-loaderAncient border border-(--color-saffron-light)/30" />

        {/* inner ring */}
        <span className="absolute inset-0 rounded-full animate-loaderAncient delay border border-(--color-saffron-light)/60" />

        {/* center glow */}
        <div className="absolute inset-5.5 rounded-full bg-(--color-saffron-light)/20 blur-[2px]" />

        <style>{`
          @keyframes loaderAncient {
            0% {
              transform: rotate(0deg) scale(0.9);
              opacity: 0.4;
            }
            50% {
              transform: rotate(180deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: rotate(360deg) scale(0.9);
              opacity: 0.4;
            }
          }

          .animate-loaderAncient {
            animation: loaderAncient 3.5s infinite ease-in-out;
          }

          .delay {
            animation-delay: -1.75s;
          }
        `}</style>
      </div>
    </div>
  )
}
