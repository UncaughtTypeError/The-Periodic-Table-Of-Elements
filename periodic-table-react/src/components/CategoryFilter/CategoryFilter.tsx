import type { ElementCategory } from '../../types';
import { CATEGORIES } from '../../data/categories';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  activeCategory: ElementCategory | null;
  onCategoryClick: (category: ElementCategory) => void;
  onCategoryHover: (category: ElementCategory | null) => void;
}

const categoryClassMap: Record<ElementCategory, string> = {
  'other-nonmetals': styles.otherNonmetals,
  'noble-gases': styles.nobleGases,
  'halogens': styles.halogens,
  'metalloids': styles.metalloids,
  'alkaline-earth-metals': styles.alkalineEarthMetals,
  'alkali-metals': styles.alkaliMetals,
  'transition-metals': styles.transitionMetals,
  'post-transition-metals': styles.postTransitionMetals,
  'lanthanoids': styles.lanthanoids,
  'actinoids': styles.actinoids,
};

export function CategoryFilter({
  activeCategory,
  onCategoryClick,
  onCategoryHover,
}: CategoryFilterProps) {
  return (
    <div className={styles.container}>
      {CATEGORIES.map(category => (
        <button
          key={category.id}
          className={`${styles.button} ${categoryClassMap[category.id]} ${
            activeCategory === category.id ? styles.active : ''
          }`}
          onClick={() => onCategoryClick(category.id)}
          onMouseEnter={() => onCategoryHover(category.id)}
          onMouseLeave={() => onCategoryHover(null)}
        >
          <span className={styles.colorDot} />
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
}
