type ImgProps = {
  filename: string;
  alt: string;
};

type ImgSizeProps = {
  size: string;
};

const BaseImg = (props: ImgProps & ImgSizeProps) => {
  return (
    <img
      src={props.filename}
      alt={props.alt}
      width={props.size}
      height={props.size}
    />
  );
};

export const MImg = (props: ImgProps) => {
  return <BaseImg filename={props.filename} alt={props.alt} size="50" />;
};

export const SImg = (props: ImgProps) => {
  return <BaseImg filename={props.filename} alt={props.alt} size="25" />;
};
