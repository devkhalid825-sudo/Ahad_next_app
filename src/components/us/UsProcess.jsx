const UsProcess = ({ steps = [] }) => (
  <div className="us-process-container">
    <div className="us-process-list">
      {steps.map((s, i) => (
        <div key={i} className="us-process-item">
          <div className="us-step">{String(i + 1).padStart(2, '0')}</div>
          <div className="us-process-item-content">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UsProcess;
