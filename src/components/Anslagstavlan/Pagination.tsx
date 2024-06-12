import { useSite } from '@/contexts/SiteContext';
import { IconNext, IconBack } from '../UI';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const { currentPageNumber, updatePageNumber } = useSite();

  const maxPagesToShow = 5; // Maximum number of page buttons to show
  const paginationItems = [];
  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > maxPagesToShow) {
    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

    if (currentPageNumber <= maxPagesBeforeCurrent) {
      endPage = maxPagesToShow;
    } else if (currentPageNumber + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    } else {
      startPage = currentPageNumber - maxPagesBeforeCurrent;
      endPage = currentPageNumber + maxPagesAfterCurrent;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <button key={i} onClick={() => updatePageNumber(i)}>
        <li
          className={`${
            currentPageNumber === i &&
            'bg-accent-500 rounded-lg text-primary-100'
          } px-3 py-1`}
        >
          {i}
        </li>
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex justify-between items-center w-96 font-medium">
        {currentPageNumber !== 1 ? (
          <button onClick={() => updatePageNumber(currentPageNumber - 1)}>
            <IconBack className="w-12 h-12 text-accent-500 shrink-0 mr-auto" />
          </button>
        ) : (
          <IconBack className="w-12 h-12 text-primary-300 shrink-0 mr-auto" />
        )}
        <ul className="flex gap-4">{paginationItems}</ul>
        {currentPageNumber !== totalPages ? (
          <button onClick={() => updatePageNumber(currentPageNumber + 1)}>
            <IconNext className="w-12 h-12 text-accent-500 shrink-0 ml-auto" />
          </button>
        ) : (
          <IconNext className="w-12 h-12 text-primary-300 shrink-0 ml-auto" />
        )}
      </div>
    </div>
  );
}
