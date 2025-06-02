import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './AboutUs.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
};

const AboutUs = () => {
  const images = [
    { src: "./images/abc.jpg", alt: "Food Collection" },
    { src: "./images/ab.jpg", alt: "Volunteers Sorting Food" },
    { src: "./images/abcd.jpg", alt: "Community Distribution" }
  ];

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to [Organization Name], where our mission is to fight hunger and
        feed hope. We believe that everyone deserves access to nutritious food, and
        we're committed to making that a reality for those in need. Our dedicated team
        works tirelessly to collect, organize, and distribute food donations to
        communities across the region.
      </p>
      <div className="slider">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true}  
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {images.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} style={{ width: '100%' }} />
          ))}
        </Carousel>
      </div>
      <p>
        Our programs include food pantries, meal services, and educational initiatives
        to teach nutrition and healthy eating habits. We partner with local farmers,
        businesses, and volunteers to ensure that surplus food reaches those who need
        it most, reducing waste and nourishing our community.
      </p>
      <p>
        Join us in our fight against hunger. Whether you donate food, time, or funds,
        your support makes a significant impact. Together, we can create a world where
        no one goes hungry.
      </p>
    </div>
  );
};

export default AboutUs;
