import { FunctionComponent, useContext, useState } from "react";
import { BsCaretDownSquareFill, BsCaretUpSquareFill } from "react-icons/bs";
import { themeContext } from "../../context/ThemeContext";
import images from "../../../public/locales/slider.ts";
import { t } from "i18next";

/**
 * Slider Component
 * Displays an image carousel with controls to navigate between them.
 */
const Slider: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const imageArray = images.images;
  const [selectedImage, setSelectedImage] = useState<number>(0);

  // Style classes for slider elements
  const containerClasses = "relative";
  const imageClasses = "w-full h-[70vh] rounded-xl object-cover";
  const sliderControlsClasses = `flex flex-col items-center justify-center absolute bottom-24 md:bottom-6 left-4 rounded p-1 
    ${theme === "dark" ? "bg-third" : "bg-light-200"}`;
  const iconClasses = "m-1 text-first cursor-pointer text-xl";
  const iconThemeClasses = theme === "dark" ? "text-first" : "text-second";
  const iconDisabledClasses = "opacity-50 cursor-not-allowed";
  const indicatorBaseClasses = "w-3 h-3 rounded m-1";
  const indicatorActiveClasses = `${
    theme === "dark" ? "bg-first bg-opacity-50" : "bg-second"
  }`;
  const indicatorInactiveClasses = `${
    theme === "dark" ? "bg-first bg-opacity-20" : "bg-second bg-opacity-20"
  }`;

  /**
   * Advances to the next image in the slider.
   */
  const handleNextImage = () => {
    setSelectedImage((prevIndex) => (prevIndex + 1) % imageArray.length);
  };

  /**
   * Goes back to the previous image in the slider.
   */
  const handlePreviousImage = () => {
    setSelectedImage((prevIndex) =>
      prevIndex === 0 ? imageArray.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={containerClasses}>
      <img
        src={imageArray[selectedImage].src}
        alt={t(imageArray[selectedImage].altKey)}
        className={imageClasses}
      />
      <div className={sliderControlsClasses}>
        <BsCaretUpSquareFill
          onClick={selectedImage === 0 ? undefined : handlePreviousImage}
          className={`${iconClasses} ${iconThemeClasses} ${
            selectedImage === 0 ? iconDisabledClasses : ""
          }`}
        />

        {imageArray.map((_, idx) => (
          <div
            className={`${indicatorBaseClasses} ${
              selectedImage === idx
                ? indicatorActiveClasses
                : indicatorInactiveClasses
            }`}
            key={idx}
          ></div>
        ))}

        <BsCaretDownSquareFill
          onClick={
            selectedImage === imageArray.length - 1
              ? undefined
              : handleNextImage
          }
          className={`${iconClasses} ${iconThemeClasses} ${
            selectedImage === imageArray.length - 1 ? iconDisabledClasses : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Slider;
