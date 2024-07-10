import { Title } from "~/components/parts";
import { DOMAINS } from "~/constants";

export const Domain = () => {
  return (
    <>
      <Title text="Domain" />
      <div class="pt-5 block gap-1 text-gray-400 text-xl">
        {DOMAINS.map((domain) => (
          <p>{domain}</p>
        ))}
      </div>
    </>
  );
};
