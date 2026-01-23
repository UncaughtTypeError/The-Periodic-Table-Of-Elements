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
        activeCategory={state.activeCategory}
        onCategoryClick={actions.setActiveCategory}
        onCategoryHover={actions.setHoveredCategory}
      />

      <ThreatFilter
        activeThreatLevel={state.activeThreatLevel}
        onThreatClick={actions.setActiveThreatLevel}
        onThreatHover={actions.setHoveredThreatLevel}
      />

      <PeriodicTable
        activeCategory={state.activeCategory}
        hoveredCategory={state.hoveredCategory}
        activeThreatLevel={state.activeThreatLevel}
        hoveredThreatLevel={state.hoveredThreatLevel}
        selectedElement={state.selectedElement}
        onElementClick={actions.selectElement}
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
