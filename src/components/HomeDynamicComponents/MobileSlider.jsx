const MobileSlider = () => {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 2000,
      cssEase: "linear"
    };
    return (
      <div style={{ height: '400px', overflow: 'hidden' }}>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={`mobile-slide-${index}`}>
              <img
                src={slide.img}
                alt={slide.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  };