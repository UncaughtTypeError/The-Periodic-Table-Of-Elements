import type { ElectronBlock } from '@/types';
import { ELECTRON_BLOCKS } from '@/data/categories';
import styles from './BlockFilter.module.css';

interface BlockFilterProps {
  activeBlockFilters: Set<ElectronBlock>;
  blockCounts: Map<ElectronBlock, number>;
  onBlockClick: (block: ElectronBlock) => void;
  onBlockHover: (block: ElectronBlock | null) => void;
}

const blockClassMap: Record<ElectronBlock, string> = {
  's-block': styles.blockS,
  'p-block': styles.blockP,
  'd-block': styles.blockD,
  'f-block': styles.blockF,
};

export function BlockFilter({
  activeBlockFilters,
  blockCounts,
  onBlockClick,
  onBlockHover,
}: BlockFilterProps) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Electron Blocks</div>
      {ELECTRON_BLOCKS.map((block) => (
        <button
          key={block.id}
          className={`${styles.button} ${blockClassMap[block.id]} ${
            activeBlockFilters.has(block.id) ? styles.active : ''
          }`}
          onClick={() => onBlockClick(block.id)}
          onMouseEnter={() => onBlockHover(block.id)}
          onMouseLeave={() => onBlockHover(null)}
        >
          <span className={styles.colorDot} />
          <span className={styles.name}>
            {block.name}
            <span className={styles.count}>
              {' '}
              ({blockCounts.get(block.id) ?? 0})
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
