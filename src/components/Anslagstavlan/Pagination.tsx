import { useSite } from '@/contexts/SiteContext';
import { IconNext, IconBack } from '../UI';
import { usePagination } from '@/hooks/useFetch';

export default function Pagination() {
  const { currentCat, currentPagination, updateCurrentPagination } = useSite();

  const { data: totalPagination = 1 } = usePagination(10, currentCat);

  const maxPagesToShow = 5; // Maximum number of page buttons to show
  const paginationItems = [];
  let startPage = 1;
  let endPage = totalPagination;

  if (totalPagination > maxPagesToShow) {
    const maxPagesBeforeCurrent = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrent = Math.ceil(maxPagesToShow / 2) - 1;

    if (currentPagination <= maxPagesBeforeCurrent) {
      endPage = maxPagesToShow;
    } else if (currentPagination + maxPagesAfterCurrent >= totalPagination) {
      startPage = totalPagination - maxPagesToShow + 1;
    } else {
      startPage = currentPagination - maxPagesBeforeCurrent;
      endPage = currentPagination + maxPagesAfterCurrent;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <button key={i} onClick={() => updateCurrentPagination(i)}>
        <li
          className={`${
            currentPagination === i &&
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
        {currentPagination !== 1 ? (
          <button
            onClick={() => updateCurrentPagination(currentPagination - 1)}
          >
            <IconBack className="w-12 h-12 text-accent-500 shrink-0" />
          </button>
        ) : (
          <IconBack className="w-12 h-12 text-primary-300 shrink-0" />
        )}
        <ul className="flex gap-4">{paginationItems}</ul>
        {currentPagination !== totalPagination ? (
          <button
            onClick={() => updateCurrentPagination(currentPagination + 1)}
          >
            <IconNext className="w-12 h-12 text-accent-500" />
          </button>
        ) : (
          <IconNext className="w-12 h-12 text-primary-300" />
        )}
      </div>
    </div>
  );
}
