import { useSite } from '@/contexts/SiteContext';

interface ListTagsProps {
  tags: any[];
}

export default function ListTags({ tags }: ListTagsProps) {
  const { cats } = useSite();

  const catNames = tags.map((catId: any) => {
    const catObject = cats.find(
      (currentCat: { id: string }) => currentCat.id === catId
    );
    return catObject
      ? catObject.name === 'tavling'
        ? 'tävling'
        : catObject.name === 'daglig'
        ? 'Daglig Verksamhet'
        : catObject.name
      : null;
  });

  // Filter out null values (tags that were not found)
  const filteredCatNames = catNames.filter(
    (catName: string) => catName !== null
  );

  return (
    <div className="font-light capitalize">{filteredCatNames.join(', ')}</div>
  );
}
