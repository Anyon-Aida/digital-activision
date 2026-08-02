import type { LabLocaleContent } from "@/content/lab";
import { ApiContractExample } from "./ApiContractExample";
import { ArchitectureExplorer } from "./ArchitectureExplorer";
import { LabHero } from "./LabHero";

type LabPageProps = {
  content: LabLocaleContent;
};

export function LabPage({ content }: LabPageProps) {
  return (
    <>
      <LabHero content={content.hero} status={content.status} />
      <ArchitectureExplorer
        architecture={content.architecture}
        permissions={content.permissions}
      />
      <ApiContractExample content={content.apiContract} />
    </>
  );
}
