import Link from 'next/link';

interface PostTagsProps {
  arr: any;
  cats: any;
}

export default function PostTags({ arr, cats }: PostTagsProps) {
  const catElements = arr.map((catId: any, index: number) => {
    const catObject = cats.find(
      (cat: { id: string; url: string }) => cat.id === catId
    );
    return catObject ? (
      <div
        key={catObject.id}
        className="capitalize px-2.5 py-1 text-sm lg:text-lg font-medium lg:font-thin rounded-lg bg-accent-500 text-primary-100 lg:text-primary-500 lg:bg-transparent lg:p-0"
      >
        <Link
          href={{
            pathname: `/aktiviteter/anslagstavlan`,
            query: { cat: catObject.id },
          }}
        >
          {catObject.name === 'tavling'
            ? 'Tävling'
            : catObject.name === 'daglig'
            ? 'Daglig Verksamhet'
            : catObject.name}
        </Link>
        {index < arr.length - 1 && <span>, </span>}
      </div>
    ) : null;
  });

  return catElements;
}
