import type { LabLocaleContent } from "@/content/lab";
import { LabExperimentPanel } from "./LabExperimentPanel";
import { PermissionMatrix } from "./PermissionMatrix";

type ArchitectureExplorerProps = {
  architecture: LabLocaleContent["architecture"];
  permissions: LabLocaleContent["permissions"];
};

export function ArchitectureExplorer({
  architecture,
  permissions,
}: ArchitectureExplorerProps) {
  return (
    <>
      {architecture.views.map((view, index) => (
        <LabExperimentPanel
          architecture={architecture}
          index={index}
          key={view.id}
          view={view}
        />
      ))}
      <PermissionMatrix content={permissions} />
    </>
  );
}
