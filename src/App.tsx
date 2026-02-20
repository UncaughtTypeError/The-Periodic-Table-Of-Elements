import { usePeriodicTableState, useFilterCounts } from './hooks';
import { CategoryFilter } from './components/CategoryFilter';
import { BlockFilter } from './components/BlockFilter';
import { ThreatFilter } from './components/ThreatFilter';
import { PeriodicTable } from './components/PeriodicTable';
import { ElementDetail, SeriesDetail } from './components/ElementDetail';
import { Footer } from './components/Footer';
import { Legend } from './components/Legend';
import { ActiveFilterCount } from './components/ActiveFilterCount';
import './styles/global.css';

function App() {
  const { state, actions } = usePeriodicTableState();

  const filterCounts = useFilterCounts({
    activeCategories: state.activeCategories,
    activeThreatLevels: state.activeThreatLevels,
    activeLegendFilters: state.activeLegendFilters,
    activeBlockFilters: state.activeBlockFilters,
  });

  return (
    <>
      <CategoryFilter
        activeCategories={state.activeCategories}
        onCategoryClick={actions.toggleActiveCategory}
        onCategoryHover={actions.setHoveredCategory}
      />

      <BlockFilter
        activeBlockFilters={state.activeBlockFilters}
        blockCounts={filterCounts.blockCounts}
        onBlockClick={actions.toggleBlockFilter}
        onBlockHover={actions.setHoveredBlockFilter}
      />

      <ThreatFilter
        activeThreatLevels={state.activeThreatLevels}
        threatCounts={filterCounts.threatCounts}
        onThreatClick={actions.toggleActiveThreatLevel}
        onThreatHover={actions.setHoveredThreatLevel}
      />

      <Legend
        activeLegendFilters={state.activeLegendFilters}
        legendCounts={filterCounts.legendCounts}
        onLegendClick={actions.toggleLegendFilter}
        onLegendHover={actions.setHoveredLegendFilter}
      />

      {filterCounts.activeCount !== null && (
        <ActiveFilterCount count={filterCounts.activeCount} />
      )}

      <PeriodicTable
        activeCategories={state.activeCategories}
        hoveredCategory={state.hoveredCategory}
        activeThreatLevels={state.activeThreatLevels}
        hoveredThreatLevel={state.hoveredThreatLevel}
        activeLegendFilters={state.activeLegendFilters}
        hoveredLegendFilter={state.hoveredLegendFilter}
        activeBlockFilters={state.activeBlockFilters}
        hoveredBlockFilter={state.hoveredBlockFilter}
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
