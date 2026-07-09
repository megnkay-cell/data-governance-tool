const DetailPanel = ({ item, onClose }) => {
  if (!item) return null;

  // Close on Escape key
  React.useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const certStyle = CERT_STYLES[item.certificationStatus] || CERT_STYLES['Uncertified'];

  return (
    <>
      <div className="detail-overlay" onClick={onClose} />
      <div className="detail-panel">
        <div className="detail-header">
          <div>
            <h2 className="detail-name">{item.name}</h2>
            <div className="detail-qualified">{item.qualifiedName}</div>
          </div>
          <button className="detail-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="detail-body">
          <div className="detail-cert">
            <CertBadge status={item.certificationStatus} />
          </div>

          <p className="detail-description">{item.description}</p>

          <div className="detail-grid">
            <div className="detail-field">
              <span className="detail-label">Object Type</span>
              <span className="detail-value">{item.objectType}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Domain</span>
              <span className="detail-value">{item.domain}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Steward</span>
              <span className="detail-value">{item.steward}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Data Source</span>
              <span className="detail-value">{item.dataSource}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Schema</span>
              <span className="detail-value">{item.schema}</span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Row Count</span>
              <span className="detail-value">
                {item.rowCount != null ? item.rowCount.toLocaleString() : '—'}
              </span>
            </div>
            <div className="detail-field">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">{item.lastUpdated}</span>
            </div>
          </div>

          <div className="detail-tags-section">
            <span className="detail-label">Tags</span>
            <div className="tag-list" style={{ marginTop: '8px' }}>
              {item.tags.map(tag => <TagBadge key={tag} tag={tag} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
