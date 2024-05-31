import { Modal } from '../UI';

interface FilterMenuProps {
  filterOpen: boolean;
  setFilterOpen: (filterOpen: boolean) => void;
  filtered: string[];
  setFiltered: (filtered: string[]) => void;
}

export default function FilterMenu({
  filterOpen,
  setFilterOpen,
  filtered,
  setFiltered,
}: FilterMenuProps) {
  return (
    <Modal action={setFilterOpen} state={filterOpen} size="sm" position={'br'}>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </Modal>
  );
}
