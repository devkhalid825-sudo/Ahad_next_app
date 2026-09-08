const UsFeatures = ({ items = [], centered = false }) => (
  <div className={centered ? 'us-grid-3' : 'us-grid-3'}>
    {items.map((it, i) => (
      <div key={i} className="us-card">
        {it.icon && <div className="us-card-icon">{it.icon}</div>}
        <h3>{it.title}</h3>
        {it.desc && <p>{it.desc}</p>}
      </div>
    ))}
  </div>
);

export default UsFeatures;
