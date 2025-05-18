type ImgProps = {
  img: string;
  webp: string;
  alt: string;
};

type ImgSizeProps = {
  size: string;
};

const BaseImg = (props: ImgProps & ImgSizeProps) => {
  return (
    <picture>
      <source srcset={props.webp} />
      <img
        src={props.img}
        alt={props.alt}
        width={props.size}
        height={props.size}
      />
    </picture>
  );
};

export const MImg = (props: ImgProps) => {
  return (
    <BaseImg img={props.img} webp={props.webp} alt={props.alt} size="50" />
  );
};

export const SImg = (props: ImgProps) => {
  return (
    <BaseImg img={props.img} webp={props.webp} alt={props.alt} size="25" />
  );
};
