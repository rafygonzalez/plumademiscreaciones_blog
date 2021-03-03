import { getStrapiMedia } from "../../../lib/media";
import cn from 'classnames'

const Image = ({ image, style, className }) => {
  const imageUrl = getStrapiMedia(image);
  return (
    <img
      className={cn(
        className
      )}
      src={imageUrl}
      alt={image.alternativeText || image.name}
      style={style}
      
    />
  );
};

export default Image;
