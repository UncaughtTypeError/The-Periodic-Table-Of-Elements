import { usePeriodicTableState } from './hooks';
import { CategoryFilter } from './components/CategoryFilter';
import { ThreatFilter } from './components/ThreatFilter';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementDetail } from './components/ElementDetail';
import { Footer } from './components/Footer';
import './styles/global.css';

function App() {
  const { state, actions } = usePeriodicTableState();

  return (
    <>
      <CategoryFilter
        activeCategories={state.activeCategories}
        onCategoryClick={actions.toggleActiveCategory}
        onCategoryHover={actions.setHoveredCategory}
      />

      <ThreatFilter
        activeThreatLevels={state.activeThreatLevels}
        onThreatClick={actions.toggleActiveThreatLevel}
        onThreatHover={actions.setHoveredThreatLevel}
      />

      <PeriodicTable
        activeCategories={state.activeCategories}
        hoveredCategory={state.hoveredCategory}
        activeThreatLevels={state.activeThreatLevels}
        hoveredThreatLevel={state.hoveredThreatLevel}
        hoveredElementNumber={state.hoveredElementNumber}
        selectedElement={state.selectedElement}
        isDetailOpen={state.isDetailOpen}
        onElementClick={actions.selectElement}
        onElementHover={actions.setHoveredElement}
      />

      <ElementDetail
        element={state.selectedElement}
        isOpen={state.isDetailOpen}
        onClose={actions.closeDetail}
      />

      <Footer />
    </>
  );
}

export default App;
