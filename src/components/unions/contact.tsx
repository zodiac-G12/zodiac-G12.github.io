import { ButtonLink, Title } from "~/components/parts";
import { CONTACTS } from "~/constants";

export const Contact = () => {
  return (
    <>
      <Title text="Contact" />
      <div class="pt-5 px-10 flex flex-wrap justify-center items-center gap-3 text-gray-400 text-xl">
        {CONTACTS.map((contact) => (
          <ButtonLink
            href={contact.href}
            img={contact.img}
            webp={contact.webp}
            text={contact.text}
          />
        ))}
      </div>
    </>
  );
};
