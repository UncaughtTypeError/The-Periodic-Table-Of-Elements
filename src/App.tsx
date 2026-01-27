import { usePeriodicTableState } from './hooks';
import { CategoryFilter } from './components/CategoryFilter';
import { ThreatFilter } from './components/ThreatFilter';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementDetail, SeriesDetail } from './components/ElementDetail';
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
        hoveredSeriesId={state.hoveredSeriesId}
        selectedElement={state.selectedElement}
        selectedSeries={state.selectedSeries}
        isDetailOpen={state.isDetailOpen}
        isSeriesDetailOpen={state.isSeriesDetailOpen}
        onElementClick={actions.selectElement}
        onElementHover={actions.setHoveredElement}
        onSeriesClick={actions.selectSeries}
        onSeriesHover={actions.setHoveredSeries}
      />

      <ElementDetail
        element={state.selectedElement}
        isOpen={state.isDetailOpen}
        onClose={actions.closeDetail}
      />

      <SeriesDetail
        series={state.selectedSeries}
        isOpen={state.isSeriesDetailOpen}
        onClose={actions.closeSeriesDetail}
      />

      <Footer />
    </>
  );
}

export default App;
