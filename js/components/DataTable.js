const ALL_COLUMNS = [
  { key: 'name',                label: 'Name',          alwaysVisible: true },
  { key: 'objectType',          label: 'Type' },
  { key: 'domain',              label: 'Domain' },
  { key: 'steward',             label: 'Steward' },
  { key: 'dataSource',          label: 'Data Source' },
  { key: 'schema',              label: 'Schema' },
  { key: 'tags',                label: 'Tags' },
  { key: 'certificationStatus', label: 'Certification' },
  { key: 'rowCount',            label: 'Row Count' },
  { key: 'lastUpdated',         label: 'Last Updated' },
  { key: 'description',         label: 'Description' },
];

const CERT_STYLES = {
  'Certified':    { background: '#dcfce7', color: '#166534' },
  'Warning':      { background: '#fef9c3', color: '#854d0e' },
  'Deprecated':   { background: '#fee2e2', color: '#991b1b' },
  'Needs Review': { background: '#ede9fe', color: '#5b21b6' },
  'Uncertified':  { background: '#f1f5f9', color: '#475569' },
};

const TAG_COLORS = {
  'PII':        { background: '#fee2e2', color: '#991b1b' },
  'Financial':  { background: '#dbeafe', color: '#1e40af' },
  'Sensitive':  { background: '#ffedd5', color: '#9a3412' },
  'Compliance': { background: '#ede9fe', color: '#5b21b6' },
  'Marketing':  { background: '#fce7f3', color: '#9d174d' },
  'Internal':   { background: '#f1f5f9', color: '#475569' },
  'Public':     { background: '#dcfce7', color: '#166534' },
};

const PAGE_SIZE = 20;

const CertBadge = ({ status }) => {
  const style = CERT_STYLES[status] || CERT_STYLES['Uncertified'];
  return <span className="badge" style={style}>{status}</span>;
};

const TagBadge = ({ tag }) => {
  const style = TAG_COLORS[tag] || { background: '#f1f5f9', color: '#475569' };
  return <span className="badge" style={style}>{tag}</span>;
};

const renderCell = (key, value) => {
  if (value === null || value === undefined) return <span className="cell-empty">—</span>;

  switch (key) {
    case 'name':
      return <strong className="cell-name">{value}</strong>;
    case 'certificationStatus':
      return <CertBadge status={value} />;
    case 'tags':
      return (
        <div className="tag-list">
          {value.map(t => <TagBadge key={t} tag={t} />)}
        </div>
      );
    case 'rowCount':
      return <span className="cell-rowcount">{value.toLocaleString()}</span>;
    default:
      return value;
  }
};

const DataTable = ({ data, totalCount, sortField, sortDir, onSort, search, onSearch, onRowClick, visibleCols, onToggleCol }) => {
  const [page, setPage] = React.useState(1);
  const [showColPicker, setShowColPicker] = React.useState(false);
  const colPickerRef = React.useRef(null);

  // Reset to page 1 when filters/search change
  React.useEffect(() => { setPage(1); }, [data.length, search]);

  // Close col picker on outside click
  React.useEffect(() => {
    if (!showColPicker) return;
    const handler = e => {
      if (colPickerRef.current && !colPickerRef.current.contains(e.target)) {
        setShowColPicker(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showColPicker]);

  const cols = ALL_COLUMNS.filter(c => c.alwaysVisible || visibleCols.includes(c.key));
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const pageData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const exportCSV = () => {
    const headers = cols.map(c => `"${c.label}"`).join(',');
    const rows = data.map(row =>
      cols.map(c => {
        const val = row[c.key];
        if (val === null || val === undefined) return '';
        if (Array.isArray(val)) return `"${val.join('; ')}"`;
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data-governance-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="table-panel">
      <div className="table-toolbar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search name, description, or qualified name..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => onSearch('')}>×</button>
          )}
        </div>
        <div className="toolbar-right">
          <span className="result-count">
            {data.length} of {totalCount} objects
          </span>
          <div className="col-picker-wrap" ref={colPickerRef}>
            <button className="btn" onClick={() => setShowColPicker(s => !s)}>
              Columns ▾
            </button>
            {showColPicker && (
              <div className="col-picker-dropdown">
                {ALL_COLUMNS.filter(c => !c.alwaysVisible).map(col => (
                  <label key={col.key} className="col-picker-option">
                    <input
                      type="checkbox"
                      checked={visibleCols.includes(col.key)}
                      onChange={() => onToggleCol(col.key)}
                    />
                    {col.label}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {cols.map(col => (
                <th
                  key={col.key}
                  className={sortField === col.key ? 'sorted' : ''}
                  onClick={() => onSort(col.key)}
                >
                  {col.label}
                  {sortField === col.key && (
                    <span className="sort-arrow">{sortDir === 'asc' ? ' ↑' : ' ↓'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={cols.length} className="empty-state">
                  No results match your filters.
                </td>
              </tr>
            ) : (
              pageData.map(row => (
                <tr key={row.id} className="data-row" onClick={() => onRowClick(row)}>
                  {cols.map(col => (
                    <td key={col.key}>
                      {renderCell(col.key, row[col.key])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            ← Prev
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button
            className="page-btn"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};
