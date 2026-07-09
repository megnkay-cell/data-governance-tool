const DEFAULT_VISIBLE_COLS = ['objectType', 'domain', 'steward', 'certificationStatus', 'tags', 'lastUpdated'];

const EMPTY_FILTERS = {
  objectTypes:  [],
  domains:      [],
  stewards:     [],
  dataSources:  [],
  tags:         [],
  certStatuses: [],
};

const App = () => {
  const [allData, setAllData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filters, setFilters] = React.useState(EMPTY_FILTERS);
  const [search, setSearch] = React.useState('');
  const [sortField, setSortField] = React.useState('name');
  const [sortDir, setSortDir] = React.useState('asc');
  const [visibleCols, setVisibleCols] = React.useState(DEFAULT_VISIBLE_COLS);
  const [selectedItem, setSelectedItem] = React.useState(null);

  React.useEffect(() => {
    Api.getDataObjects()
      .then(data => { setAllData(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  const filtered = React.useMemo(() => {
    return allData.filter(item => {
      if (filters.objectTypes.length  && !filters.objectTypes.includes(item.objectType))          return false;
      if (filters.domains.length      && !filters.domains.includes(item.domain))                  return false;
      if (filters.stewards.length     && !filters.stewards.includes(item.steward))                return false;
      if (filters.dataSources.length  && !filters.dataSources.includes(item.dataSource))          return false;
      if (filters.certStatuses.length && !filters.certStatuses.includes(item.certificationStatus)) return false;
      if (filters.tags.length         && !filters.tags.some(t => item.tags.includes(t)))          return false;

      if (search) {
        const q = search.toLowerCase();
        const hit = item.name.toLowerCase().includes(q)
          || item.description.toLowerCase().includes(q)
          || item.qualifiedName.toLowerCase().includes(q);
        if (!hit) return false;
      }

      return true;
    });
  }, [allData, filters, search]);

  const sorted = React.useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal = a[sortField] ?? '';
      let bVal = b[sortField] ?? '';
      if (Array.isArray(aVal)) aVal = aVal.join(', ');
      if (Array.isArray(bVal)) bVal = bVal.join(', ');
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortField, sortDir]);

  const handleSort = field => {
    if (field === sortField) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const handleToggleCol = col =>
    setVisibleCols(cols =>
      cols.includes(col) ? cols.filter(c => c !== col) : [...cols, col]
    );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#64748b' }}>
      Loading data objects...
    </div>
  );

  if (error) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#991b1b' }}>
      Error: {error}
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Data Governance Tool</h1>
          <div className="header-subtitle">Powered by Alation</div>
        </div>
        <div className="header-right">
          {filtered.length} of {allData.length} objects
        </div>
      </header>

      <div className="app-body">
        <FilterPanel
          data={allData}
          filters={filters}
          onFilterChange={setFilters}
          onClearAll={() => setFilters(EMPTY_FILTERS)}
        />
        <DataTable
          data={sorted}
          totalCount={allData.length}
          sortField={sortField}
          sortDir={sortDir}
          onSort={handleSort}
          search={search}
          onSearch={setSearch}
          onRowClick={setSelectedItem}
          visibleCols={visibleCols}
          onToggleCol={handleToggleCol}
        />
      </div>

      {selectedItem && (
        <DetailPanel
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
