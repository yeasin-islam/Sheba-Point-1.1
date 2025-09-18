import React from 'react';

/**
 * ShimmerBlock Component
 * A reusable component to create a shimmering placeholder effect.
 * It uses a pseudo-element with a sliding gradient to create the shimmer animation.
 * This is a common pattern for creating engaging loading skeletons.
 */
const ShimmerBlock = ({ className }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-slate-200 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-slate-50/50 to-transparent"></div>
    </div>
  );
};

/**
 * DoctorDetailsSkeleton Component
 * This component renders a skeleton loading screen for a doctor's detail page,
 * enhanced with a shimmering animation effect to provide better user feedback during data fetching.
 * The layout is structured to mimic the final page content, including profile, about, availability, and sidebar sections.
 */
export default function DoctorDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* We need to define the shimmer animation keyframes.
        In a real project, this would go in your tailwind.config.js file.
        For this self-contained component, a style tag is a straightforward way to do it.
      */}
      <style>
        {`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>

      <main className="container mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-3 md:py-12">
        
        {/* Left column: Main content skeleton */}
        <section className="md:col-span-2 space-y-8">
          
          {/* Profile Card Skeleton */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row items-start p-6 gap-6">
              {/* Avatar Placeholder */}
              <div className="w-28 h-28 rounded-full bg-slate-200 flex-shrink-0 relative overflow-hidden">
                 <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
              </div>
              
              {/* Doctor Info Placeholder */}
              <div className="flex-1 space-y-4 mt-2">
                <ShimmerBlock className="h-7 w-3/4" />
                <div className="flex items-center gap-4">
                  <ShimmerBlock className="h-5 w-24" />
                  <ShimmerBlock className="h-5 w-20" />
                </div>
                <ShimmerBlock className="h-4 w-1/2" />
              </div>
            </div>
            
            {/* Contact + Languages + Qualification */}
            <div className="grid grid-cols-3 border-t border-slate-200 divide-x divide-slate-200 p-4">
                <div className="px-4 space-y-2">
                    <ShimmerBlock className="h-4 w-3/4" />
                    <ShimmerBlock className="h-4 w-1/2" />
                </div>
                <div className="px-4 space-y-2">
                    <ShimmerBlock className="h-4 w-3/4" />
                    <ShimmerBlock className="h-4 w-1/2" />
                </div>
                <div className="px-4 space-y-2">
                    <ShimmerBlock className="h-4 w-3/4" />
                    <ShimmerBlock className="h-4 w-1/2" />
                </div>
            </div>
          </div>

          {/* Details Section Skeleton (About, Availability, etc.) */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-8">
            {/* About Section */}
            <div className="space-y-4">
              <ShimmerBlock className="h-6 w-48" />
              <div className="space-y-3">
                <ShimmerBlock className="h-4 w-full" />
                <ShimmerBlock className="h-4 w-5/6" />
                <ShimmerBlock className="h-4 w-2/3" />
              </div>
            </div>
            
            {/* Availability Calendar Placeholder */}
            <div>
              <ShimmerBlock className="h-6 w-40 mb-4" />
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {Array.from({ length: 7 }).map((_, i) => (
                  <ShimmerBlock key={i} className="h-20" />
                ))}
              </div>
            </div>
            
            {/* Qualifications & Clinic */}
            <div className="grid md:grid-cols-2 gap-6">
                <ShimmerBlock className="h-28" />
                <ShimmerBlock className="h-28" />
            </div>
          </div>
        </section>

        {/* Right column: Sidebar skeleton */}
        <aside className="space-y-6 md:sticky md:top-12 h-fit">
          <ShimmerBlock className="h-36" />
          <ShimmerBlock className="h-28" />
          <ShimmerBlock className="h-32" />
        </aside>
      </main>

      {/* Mobile Sticky Action Bar Skeleton */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/80 backdrop-blur-sm p-4 md:hidden flex justify-between items-center">
        <ShimmerBlock className="h-6 w-28" />
        <ShimmerBlock className="h-12 w-36" />
      </div>
    </div>
  );
}
