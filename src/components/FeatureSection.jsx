import React from 'react';
import { BookOpen, Globe, Lightbulb, GraduationCap } from 'lucide-react';

const features = [
  {
    name: 'Learn Basic Akan',
    description:
      'Start your journey with accessible beginner resources: alphabet, greetings, and essential phrases.',
    icon: BookOpen,
  },
  {
    name: 'Explore Akan Culture',
    description:
      'Discover Akan traditions, history, arts, music, and social customs in a rich cultural tapestry.',
    icon: Globe,
  },
  {
    name: 'Akan Dictionary',
    description:
      'Access a comprehensive Akan↔English dictionary with example sentences and audio pronunciations.',
    icon: Lightbulb,
  },
  {
    name: 'Support Research',
    description:
      'Delve into in-depth linguistic resources and materials designed for Akan language research.',
    icon: GraduationCap,
  },
];

const FeatureSection = () => {
  return (
    <section className="relative bg-cover bg-center bg-[url('/src/assets/medium-shot-woman-having-fun-outdoors_23-2150726005.jpg')] py-12 sm:py-16 lg:py-20">
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-lg bg-black/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-8 sm:mb-12">
          <h2 className="text-sm sm:text-base font-semibold text-amber-400 mb-2">
            Explore Akan Heritage
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 sm:mb-4">
            Discover the Heart of Akan
          </p>
          <p className="text-base sm:text-lg text-gray-200 max-w-xl mx-auto">
            Unlock the beauty and depth of Akan language and culture. From basic learning to advanced research, our platform provides the resources you need.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-4xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.name} className="relative pl-14 sm:pl-16">
                <dt className="text-base sm:text-lg font-semibold text-white">
                  <div className="absolute top-0 left-0 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-[#f59e0b] shadow-lg">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-sm sm:text-base text-gray-200 leading-relaxed">
                  {feature.description}
                </dd>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
