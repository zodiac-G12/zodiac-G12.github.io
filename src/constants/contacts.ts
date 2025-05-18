import GitHubLogo from "~/assets/github.png";
import XLogo from "~/assets/x.png";
import DiscordLogo from "~/assets/discord.png";
import BlogLogo from "~/assets/blog.png";

import GitHubLogoWebp from "~/assets/github.webp";
import XLogoWebp from "~/assets/x.webp";
import DiscordLogoWebp from "~/assets/discord.webp";
import BlogLogoWebp from "~/assets/blog.webp";

export const CONTACTS: {
  href: string;
  img: string;
  webp: string;
  text: string;
}[] = [
  {
    href: "https://github.com/zodiac-G12",
    img: GitHubLogo,
    webp: GitHubLogoWebp,
    text: "GitHub",
  },
  {
    href: "https://x.com/zodi_G12",
    img: XLogo,
    webp: XLogoWebp,
    text: "X",
  },
  {
    href: "https://discord.gg/nFDJe3v4dZ",
    img: DiscordLogo,
    webp: DiscordLogoWebp,
    text: "Discord",
  },
  {
    href: "https://zodiac-g12.github.io/flog/",
    img: BlogLogo,
    webp: BlogLogoWebp,
    text: "Blog",
  },
];
