const UsWhySplit = ({ items = [], outcomesLabel = 'Outcomes', outcomes = [] }) => (
  <div className="us-why-split">
    <ul className="us-why-list">
      {items.map((it, i) => (
        <li key={i} className="us-why-item">
          {it.icon && <span className="us-why-icon">{it.icon}</span>}
          <div>
            <h4>{it.title}</h4>
            <p>{it.desc}</p>
          </div>
        </li>
      ))}
    </ul>
    {outcomes.length > 0 && (
      <div className="us-outcomes-panel">
        <div className="us-outcomes-label">{outcomesLabel}</div>
        <div>
          {outcomes.map((o, i) => (
            <div key={i} className="us-outcome-item">
              <div className="us-outcome-num">{o.number}</div>
              <div className="us-outcome-desc">{o.label}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default UsWhySplit;
