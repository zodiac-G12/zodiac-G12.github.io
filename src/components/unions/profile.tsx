import { Avator, Introduce } from "~/components/parts";

export const Profile = () => {
  return (
    <div class="pt-9 flex justify-center items-center gap-5">
      <div class="h-[150px] w-[150px]">
        <Avator />
      </div>
      <Introduce />
    </div>
  );
};
