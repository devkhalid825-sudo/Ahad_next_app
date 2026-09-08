const UsStats = ({ stats = [] }) => (
  <div className="us-stats-band">
    <div className="us-container us-stats-container">
      <div className="us-stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="us-stat">
            <b>{s.number}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default UsStats;
