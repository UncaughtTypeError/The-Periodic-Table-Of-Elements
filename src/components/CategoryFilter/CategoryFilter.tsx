import type { ElementCategory, CategoryDefinition } from '@/types';
import { NONMETAL_CATEGORIES, METALLOID_CATEGORIES, METAL_CATEGORIES } from '@/data/categories';
import styles from './CategoryFilter.module.css';

interface CategoryFilterProps {
  activeCategories: Set<ElementCategory>;
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

function CategoryButton({
  category,
  isActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  category: CategoryDefinition;
  isActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      className={`${styles.button} ${categoryClassMap[category.id]} ${
        isActive ? styles.active : ''
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.colorDot} />
      <span>{category.name}</span>
    </button>
  );
}

export function CategoryFilter({
  activeCategories,
  onCategoryClick,
  onCategoryHover,
}: CategoryFilterProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.groupLabels}>
        <div className={styles.nonmetalsLabel}>
          <span>Nonmetals</span>
        </div>
        <div className={styles.metalsLabel}>
          <span>Metals</span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.group}>
          {NONMETAL_CATEGORIES.map(category => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategories.has(category.id)}
              onClick={() => onCategoryClick(category.id)}
              onMouseEnter={() => onCategoryHover(category.id)}
              onMouseLeave={() => onCategoryHover(null)}
            />
          ))}
        </div>
        <div className={styles.group}>
          {METALLOID_CATEGORIES.map(category => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategories.has(category.id)}
              onClick={() => onCategoryClick(category.id)}
              onMouseEnter={() => onCategoryHover(category.id)}
              onMouseLeave={() => onCategoryHover(null)}
            />
          ))}
        </div>
        <div className={styles.group}>
          {METAL_CATEGORIES.map(category => (
            <CategoryButton
              key={category.id}
              category={category}
              isActive={activeCategories.has(category.id)}
              onClick={() => onCategoryClick(category.id)}
              onMouseEnter={() => onCategoryHover(category.id)}
              onMouseLeave={() => onCategoryHover(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
