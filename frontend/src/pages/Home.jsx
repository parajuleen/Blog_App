import React, { useEffect } from "react";
import img3 from "../Assets/banner.jpg";

const Home = () => {
  return (
    <>
      <div className="container mx-auto py-4">
        {/* Banner Image */}
        <img src={img3} alt="banner" className="w-full h-96 object-cover" />

        {/* Header Section */}
        <header className="text-center my-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Website</h1>
          <p className="text-lg text-gray-600 mt-4">Explore the world of creativity</p>
        </header>

        {/* Card Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title 1</h2>
            <p className="text-gray-600">This is a brief description of what the card is about.</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Learn More</button>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title 2</h2>
            <p className="text-gray-600">This is another description for the second card.</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Learn More</button>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Card Title 3</h2>
            <p className="text-gray-600">This is yet another description for the third card.</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Learn More</button>
          </div>
        </section>

      
      </div>
    </>
  );
};

export default Home;
