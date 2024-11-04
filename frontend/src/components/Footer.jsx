import React from 'react';

const Footer = () => {
  return (
    <footer className="text-gray-600 py-3 h-[10vh] min-h-[4rem] mt-8 border border-black">
      <div className="container mx-auto px-4">
        <div className="justify-center items-center text-center font-primary text-secondary-size">
          <p className="text-fourth-size p-0">&copy; 2024 W3INVENTOR</p>
          <p className='py-0 text-fourth-size'>All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
