import React from 'react';

type TPageTitle = {
  title: string;
  subtitle?: string;
};

const PageTitle = ({ subtitle, title }: TPageTitle) => {
  return (
    <section>
      <h1 className="font-bold text-3xl lg:text-4xl">{title}</h1>
      {subtitle && <h3 className="text-gray-600">{subtitle}</h3>}
    </section>
  );
};

export default PageTitle;
