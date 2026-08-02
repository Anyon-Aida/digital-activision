import type { StudioLocaleContent } from "@/content/studio";
import { StudioContact } from "./StudioContact";
import { StudioExperiments } from "./StudioExperiments";
import { StudioFeaturedWork } from "./StudioFeaturedWork";
import { StudioHero } from "./StudioHero";
import { StudioProcess } from "./StudioProcess";
import { StudioScope } from "./StudioScope";
import { StudioServices } from "./StudioServices";

type StudioPageProps = {
  content: StudioLocaleContent;
};

export function StudioPage({ content }: StudioPageProps) {
  return (
    <>
      <StudioHero content={content.hero} />
      <StudioServices content={content} />
      <StudioFeaturedWork content={content} />
      <StudioExperiments content={content} />
      <StudioProcess content={content} />
      <StudioScope content={content.scope} />
      <StudioContact content={content.contact} />
    </>
  );
}
