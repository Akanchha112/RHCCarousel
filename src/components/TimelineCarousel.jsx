import React, { useState, useEffect } from 'react';
import './TimelineCarousel.css';

const timelineData = [
  { year: '1985', title: 'PIONEERING BEGINNINGS', description: 'Establishment of Al Maigliah Markets Company Limited and Al Deira Markets Center' },
  { year: '2012', title: 'RIYADH HOLDING COMPANY ESTABLISHMENT', description: 'The transformation into Riyadh Holding Company and the launch of Scrap Metal City as a Public Good Project.' },
  { year: '2015', title: 'URBAN REVITALIZATION', description: 'Transformation of Haraj Ibn Qasim with a new visitor experience, increased security, and new operational standards.' },
  { year: '2018', title: 'INNOVATIVE VENTURES', description: 'Opening East Center for Spare Parts, the only official center authorized to sell used car spare parts in Riyadh' },
  { year: '2019', title: 'URBAN COMMERCIAL DEVELOPMENT', description: 'Launched Arriyadh Gate, a shopping complex for international brands' },
  { year: '2023', title: 'STRATEGIC EXPANSION', description: 'Launched our five-year strategy, emphasizing citizen-centric solutions and Riyadh’s ecosystem. Agreements with Riyadh municipality were signed to develop Aloraiyja Industrial City and activate King Salman Oasis' },
];

const TimelineCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const slidesToShow = windowWidth <= 768 ? 1 : 3;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? 0 : currentIndex - slidesToShow;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex + slidesToShow >= timelineData.length;
    const newIndex = isLastSlide ? currentIndex : currentIndex + slidesToShow;
    setCurrentIndex(newIndex);
  };

  const visibleSlides = timelineData.slice(currentIndex, currentIndex + slidesToShow);
  const timelineLineStyle = windowWidth <= 768 ? { top: '31%' } : {};
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="timeline-container relative">
        <button onClick={goToPrevious} className="prev" disabled={currentIndex === 0}>❮</button>
        <button onClick={goToNext} className="next" disabled={currentIndex + slidesToShow >= timelineData.length}>❯</button>
        <div className="timeline-line absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2" style={timelineLineStyle}></div>
        {/* <div className="timeline-line"></div> */}
        <div className="flex justify-between items-center">
          {visibleSlides.map((item, index) => (
            <div key={index} className={`timeline-item relative ${windowWidth <= 768 ? 'w-full' : 'w-1/3'} px-4`}>
              <div className={`timeline-content ${index % 2 === 0 ? 'above' : 'below'} p-4`}>
                <div className="year text-left text-2xl font-bold">{item.year}</div>
                <div className="title text-left mt-4 text-lg font-semibold">{item.title}</div>
                <div className="text-left mt-1">{item.description}</div>
              </div>
              <div className="timeline-point"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineCarousel;
