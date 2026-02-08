import { Title, MImg } from "~/components/parts";
import { PROGRAMS } from "~/constants";

export const Program = () => {
  return (
    <>
      <Title text="Program Language and etc" />
      <div class="pt-5 px-5 flex flex-wrap justify-center items-center gap-1">
        {PROGRAMS.map((program) => (
          <MImg img={program.img} webp={program.webp} alt={program.name} />
        ))}
      </div>
    </>
  );
};
