import { SImg } from "~/components/parts";

export const ButtonLink = (props: {
  text: string;
  img: string;
  webp: string;
  href: string;
}) => {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      class="py-2 px-4 flex gap-1 items-center bg-gray-300 text-[#181818] rounded-md shadow-sm shadow-gray-500 select-none"
    >
      <SImg img={props.img} webp={props.webp} alt="" />
      {props.text}
    </a>
  );
};
