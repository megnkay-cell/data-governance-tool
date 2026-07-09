const PILLARS = ['Plan', 'Source', 'Make', 'Logistics', 'Customer', 'E2E'];

const PILLAR_ICONS = {
  Plan:      '📋',
  Source:    '📦',
  Make:      '🏭',
  Logistics: '🚚',
  Customer:  '👥',
  E2E:       '🔄',
};

const CERT_ORDER = ['Certified', 'Warning', 'Needs Review', 'Uncertified', 'Deprecated'];

const CERT_BAR_COLORS = {
  Certified:    '#22c55e',
  Warning:      '#f59e0b',
  'Needs Review': '#8b5cf6',
  Uncertified:  '#94a3b8',
  Deprecated:   '#ef4444',
};

// ── Shared helper ────────────────────────────────────────
const buildPillarStats = (data) => {
  const byPillar = {};
  PILLARS.forEach(p => { byPillar[p] = []; });
  data.forEach(item => { if (byPillar[item.pillar]) byPillar[item.pillar].push(item); });
  return byPillar;
};

// ── Data Quality View ────────────────────────────────────
const QualityScore = ({ pct }) => {
  const color = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="pv-score" style={{ color }}>
      {pct}<span className="pv-score-pct">%</span>
    </div>
  );
};

const CertBar = ({ items }) => {
  const total = items.length;
  if (total === 0) return null;
  const counts = {};
  items.forEach(i => { counts[i.certificationStatus] = (counts[i.certificationStatus] || 0) + 1; });

  return (
    <div className="pv-cert-bar">
      {CERT_ORDER.filter(s => counts[s]).map(status => (
        <div
          key={status}
          title={`${status}: ${counts[status]}`}
          style={{
            width: `${(counts[status] / total) * 100}%`,
            background: CERT_BAR_COLORS[status],
          }}
        />
      ))}
    </div>
  );
};

const DataQualityView = ({ data }) => {
  const byPillar = buildPillarStats(data);

  return (
    <div className="pv-container">
      <div className="pv-header">
        <h2 className="pv-title">Data Quality by Pillar</h2>
        <p className="pv-subtitle">Certification status breakdown across all data objects</p>
      </div>

      <div className="pv-grid">
        {PILLARS.map(pillar => {
          const items = byPillar[pillar];
          const total = items.length;
          const certCounts = {};
          CERT_ORDER.forEach(s => { certCounts[s] = 0; });
          items.forEach(i => { certCounts[i.certificationStatus] = (certCounts[i.certificationStatus] || 0) + 1; });
          const certified = certCounts['Certified'];
          const qualityPct = total > 0 ? Math.round((certified / total) * 100) : 0;
          const issues = certCounts['Warning'] + certCounts['Deprecated'] + certCounts['Needs Review'];

          return (
            <div key={pillar} className="pv-card">
              <div className="pv-card-header">
                <span className="pv-icon">{PILLAR_ICONS[pillar]}</span>
                <div>
                  <div className="pv-pillar-name">{pillar}</div>
                  <div className="pv-object-count">{total} object{total !== 1 ? 's' : ''}</div>
                </div>
                <QualityScore pct={qualityPct} />
              </div>

              <CertBar items={items} />

              <div className="pv-legend">
                {CERT_ORDER.map(status => certCounts[status] > 0 && (
                  <div key={status} className="pv-legend-row">
                    <span className="pv-legend-dot" style={{ background: CERT_BAR_COLORS[status] }} />
                    <span className="pv-legend-label">{status}</span>
                    <span className="pv-legend-count">{certCounts[status]}</span>
                  </div>
                ))}
              </div>

              {issues > 0 && (
                <div className="pv-alert">
                  ⚠ {issues} object{issues !== 1 ? 's' : ''} need attention
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Data Governance View ─────────────────────────────────
const GovernanceMeter = ({ label, value, total, color }) => {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="pv-meter">
      <div className="pv-meter-top">
        <span className="pv-meter-label">{label}</span>
        <span className="pv-meter-val">{value} / {total}</span>
      </div>
      <div className="pv-meter-track">
        <div className="pv-meter-fill" style={{ width: `${pct}%`, background: color || '#3b82f6' }} />
      </div>
    </div>
  );
};

const DataGovernanceView = ({ data }) => {
  const byPillar = buildPillarStats(data);

  return (
    <div className="pv-container">
      <div className="pv-header">
        <h2 className="pv-title">Data Governance by Pillar</h2>
        <p className="pv-subtitle">Stewardship, compliance, and sensitive data coverage</p>
      </div>

      <div className="pv-grid">
        {PILLARS.map(pillar => {
          const items = byPillar[pillar];
          const total = items.length;
          const stewarded      = items.filter(i => i.steward).length;
          const tagged         = items.filter(i => i.tags && i.tags.length > 0).length;
          const hasPII         = items.filter(i => i.tags && i.tags.includes('PII')).length;
          const hasCompliance  = items.filter(i => i.tags && i.tags.includes('Compliance')).length;
          const hasSensitive   = items.filter(i => i.tags && i.tags.includes('Sensitive')).length;
          const certified      = items.filter(i => i.certificationStatus === 'Certified').length;
          const deprecated     = items.filter(i => i.certificationStatus === 'Deprecated').length;
          const sources        = new Set(items.map(i => i.dataSource)).size;

          return (
            <div key={pillar} className="pv-card">
              <div className="pv-card-header">
                <span className="pv-icon">{PILLAR_ICONS[pillar]}</span>
                <div>
                  <div className="pv-pillar-name">{pillar}</div>
                  <div className="pv-object-count">{total} object{total !== 1 ? 's' : ''} · {sources} source{sources !== 1 ? 's' : ''}</div>
                </div>
              </div>

              <div className="pv-meters">
                <GovernanceMeter label="Steward assigned"    value={stewarded}     total={total} color="#3b82f6" />
                <GovernanceMeter label="Certified"           value={certified}     total={total} color="#22c55e" />
                <GovernanceMeter label="Tagged"              value={tagged}        total={total} color="#8b5cf6" />
              </div>

              <div className="pv-flags">
                {hasPII > 0 && (
                  <span className="pv-flag pv-flag-pii">🔒 {hasPII} PII</span>
                )}
                {hasCompliance > 0 && (
                  <span className="pv-flag pv-flag-compliance">⚖ {hasCompliance} Compliance</span>
                )}
                {hasSensitive > 0 && (
                  <span className="pv-flag pv-flag-sensitive">🛡 {hasSensitive} Sensitive</span>
                )}
                {deprecated > 0 && (
                  <span className="pv-flag pv-flag-deprecated">✕ {deprecated} Deprecated</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
