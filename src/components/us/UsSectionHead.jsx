const UsSectionHead = ({ eyebrow, title, sub, align = 'center' }) => {
  if (align === 'left') {
    return (
      <div className="us-section-head">
        <div className="us-section-head-text">
          {eyebrow && <span className="us-section-eyebrow">{eyebrow}</span>}
          {title && <h2>{title}</h2>}
          {sub && <p>{sub}</p>}
        </div>
      </div>
    );
  }
  return (
    <div className="us-section-head-center">
      <div className="us-section-head-text">
        <span className="us-section-eyebrow">{eyebrow}</span>
        {title && <h2>{title}</h2>}
        {sub && <p>{sub}</p>}
      </div>
    </div>
  );
};

export default UsSectionHead;
