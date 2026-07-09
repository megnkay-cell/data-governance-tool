const getUniqueValues = (data, key) => {
  const values = new Set();
  data.forEach(item => {
    const val = item[key];
    if (Array.isArray(val)) val.forEach(v => values.add(v));
    else if (val != null) values.add(val);
  });
  return Array.from(values).sort();
};

const getCounts = (data, key) => {
  const counts = {};
  data.forEach(item => {
    const val = item[key];
    if (Array.isArray(val)) {
      val.forEach(v => { counts[v] = (counts[v] || 0) + 1; });
    } else if (val != null) {
      counts[val] = (counts[val] || 0) + 1;
    }
  });
  return counts;
};

const FILTER_SECTIONS = [
  { key: 'objectTypes',  label: 'Object Type',    dataKey: 'objectType' },
  { key: 'domains',      label: 'Domain',          dataKey: 'domain' },
  { key: 'stewards',     label: 'Steward',         dataKey: 'steward' },
  { key: 'dataSources',  label: 'Data Source',     dataKey: 'dataSource' },
  { key: 'tags',         label: 'Tags',            dataKey: 'tags' },
  { key: 'certStatuses', label: 'Certification',   dataKey: 'certificationStatus' },
];

const FilterPanel = ({ data, filters, onFilterChange, onClearAll }) => {
  const [collapsed, setCollapsed] = React.useState({});

  const toggleSection = key =>
    setCollapsed(c => ({ ...c, [key]: !c[key] }));

  const toggleFilter = (category, value) => {
    const current = filters[category] || [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilterChange({ ...filters, [category]: next });
  };

  const totalActive = Object.values(filters).flat().length;

  return (
    <aside className="filter-panel">
      <div className="filter-panel-header">
        <span className="filter-panel-title">Filters</span>
        {totalActive > 0 && (
          <button className="clear-all-btn" onClick={onClearAll}>
            Clear all ({totalActive})
          </button>
        )}
      </div>

      {FILTER_SECTIONS.map(section => {
        const values = getUniqueValues(data, section.dataKey);
        const counts = getCounts(data, section.dataKey);
        const active = filters[section.key] || [];
        const isCollapsed = collapsed[section.key];

        return (
          <div key={section.key} className="filter-section">
            <button
              className={`filter-section-btn${active.length ? ' has-active' : ''}`}
              onClick={() => toggleSection(section.key)}
            >
              <span>{section.label}</span>
              <span className="filter-section-meta">
                {active.length > 0 && (
                  <span className="active-badge">{active.length}</span>
                )}
                <span className={`chevron${isCollapsed ? '' : ' up'}`}>▾</span>
              </span>
            </button>

            {!isCollapsed && (
              <div className="filter-options">
                {values.map(value => (
                  <label key={value} className="filter-option">
                    <input
                      type="checkbox"
                      checked={active.includes(value)}
                      onChange={() => toggleFilter(section.key, value)}
                    />
                    <span className="filter-option-label">{value}</span>
                    <span className="filter-option-count">{counts[value] || 0}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
};
