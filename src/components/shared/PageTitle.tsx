import React from 'react';

type TPageTitle = {
  title: string;
  subtitle?: string;
};

const PageTitle = ({ subtitle, title }: TPageTitle) => {
  return (
    <section>
      <h1 className="font-bold text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">{title}</h1>
      {subtitle && <h3 className="text-gray-600 dark:text-gray-300">{subtitle}</h3>}
    </section>
  );
};

export default PageTitle;
