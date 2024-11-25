import Button from "@/components/ui/Button";

import { ProductIamges } from "@/types/Products";
import { useState } from "react";

const ProductGallery = ({
  modal,
  imageList,
  className,
  loading,
  action,
}: {
  imageList: ProductIamges[];
  modal?: boolean;
  loading?: { [key: string]: boolean };
  className?: string;
  action?: (id: string) => void;
}) => {
  const [renderImage, setRenderImage] = useState<string>(
    imageList && (imageList[0]?.image_url as string),
  );

  // useEffect(() => {
  //   setRenderImage((imageList[0] as Image)?.imageUrl);
  // }, [imageList]);

  const [active, setActive] = useState<{ [key: string]: boolean }>({
    [`${imageList && imageList[0]?.id}`]: true,
  });

  const handleRenderImage = (id: string, image: string) => {
    if (id) {
      setRenderImage(image);
      setActive((prev) => ({ [id]: !prev[id] }));
    }
  };

  return (
    <div className={`${className} flex flex-col-reverse justify-between gap-3`}>
      <article className="flex flex-wrap gap-3">
        {imageList?.map(({ image_url, id }) => (
          <div key={id}>
            <figure
              onClick={() => handleRenderImage(`${id}`, image_url as string)}
              className={`${
                active[`${id}`] ? "activeThumb" : "notActiveThumb"
              } relative h-20 w-20 gap-3 overflow-hidden`}
            >
              <img
                src={image_url as string}
                alt=""
                className="!h-full object-cover"
              />
            </figure>
            <Button
              type="button"
              className="mt-2 w-full !bg-negative !px-2 !py-1"
              loading={loading && loading[`${id}`]}
              onClick={() => action && action(`${id}`)}
            >
              Delete
            </Button>
          </div>
        ))}
      </article>

      <figure
        className={`card relative ${modal ? "h-56" : "h-96"} overflow-hidden`}
      >
        <img
          src={renderImage}
          alt="TBT Product Images"
          className="!h-full object-cover"
        />
      </figure>
    </div>
  );
};

export default ProductGallery;
