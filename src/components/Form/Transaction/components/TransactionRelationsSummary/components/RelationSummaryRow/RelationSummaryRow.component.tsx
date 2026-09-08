import { Badge } from "@/components/Badge/Badge.component";
import { getIconComponent } from "@/components/IconSelector/utils/iconSelector.utils";
import { getContrastTextColor } from "@/utils/getContrastTextColor.utils";

export interface RelationOption {
  id: number;
  name: string;
  color: string;
  icon: string;
}

interface RelationSummaryRowProps {
  title: string;
  relations: RelationOption[];
}

export function RelationSummaryRow({
  title,
  relations
}: RelationSummaryRowProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <span className="text-muted-foreground w-28 shrink-0 text-xs font-medium">
        {title}
      </span>
      <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
        {relations.length > 0 ? (
          relations.map((relation) => {
            const Icon = getIconComponent(relation.icon);

            return (
              <Badge
                key={relation.id}
                className={getContrastTextColor(relation.color)}
                style={{ backgroundColor: relation.color }}
              >
                {Icon && <Icon />}
                {relation.name}
              </Badge>
            );
          })
        ) : (
          <span className="text-muted-foreground text-xs">Não selecionada</span>
        )}
      </div>
    </div>
  );
}
