import { CardDescription, CardTitle } from "@/components/Card/Card.component";

type RelationListHeaderProps = {
  title: string;
  description: string;
};

export function RelationListHeader({
  title,
  description
}: RelationListHeaderProps) {
  return (
    <div>
      <CardTitle>{title}</CardTitle>
      <CardDescription className="mt-1">{description}</CardDescription>
    </div>
  );
}
