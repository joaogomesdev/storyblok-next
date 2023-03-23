import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from "@storyblok/react";

const Page = ({ blok }: any) => (
  <main {...storyblokEditable(blok)}>
    {blok.body.map((nestedBlok: any) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
