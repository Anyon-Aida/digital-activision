import type { StudioLocaleContent } from "@/content/studio";
import { StudioContact } from "./StudioContact";
import { StudioExperiments } from "./StudioExperiments";
import { StudioHero } from "./StudioHero";
import { StudioPackages } from "./StudioPackages";
import { StudioProcess } from "./StudioProcess";
import { StudioServices } from "./StudioServices";

type StudioPageProps = {
  content: StudioLocaleContent;
};

export function StudioPage({ content }: StudioPageProps) {
  return (
    <>
      <StudioHero content={content.hero} />
      <StudioServices content={content} />
      <StudioExperiments content={content} />
      <StudioProcess content={content} />
      <StudioPackages content={content} />
      <StudioContact content={content.contact} />
    </>
  );
}
