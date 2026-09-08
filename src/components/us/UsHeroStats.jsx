const UsHeroStats = ({ stats = [] }) => (
  <div className="us-hero-stats">
    {stats.map((s, i) => (
      <div key={i} className="us-hero-stat">
        <b>{s.number}</b>
        <span>{s.label}</span>
      </div>
    ))}
  </div>
);

export default UsHeroStats;
