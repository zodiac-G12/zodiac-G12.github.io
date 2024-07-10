import GitHubLogo from '~/assets/github.svg';
import XLogo from '~/assets/x.svg';
import DiscordLogo from '~/assets/discord.svg';
import BlogLogo from '~/assets/blog.png';

export const CONTACTS: {
  href: string;
  img: string;
  text: string;
}[] = [
  {
    href: 'https://github.com/zodiac-G12',
    img: GitHubLogo,
    text: 'GitHub',
  },
  {
    href: 'https://x.com/zodi_G12',
    img: XLogo,
    text: 'X',
  },
  {
    href: 'https://discord.gg/nFDJe3v4dZ',
    img: DiscordLogo,
    text: 'Discord',
  },
  {
    href: 'https://zodiac-g12.github.io/blog/',
    img: BlogLogo,
    text: 'Blog'
  },
];
