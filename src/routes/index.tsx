import { Profile, Domain, Program, Contact } from "~/components/unions";

export default function Home() {
  return (
    <main class="px-4 py-10 mx-auto text-center text-gray-700">
      <Profile />

      <div class="pt-10">
        <Domain />
      </div>

      <div class="pt-10">
        <Program />
      </div>

      <div class="pt-10">
        <Contact />
      </div>
    </main>
  );
}
