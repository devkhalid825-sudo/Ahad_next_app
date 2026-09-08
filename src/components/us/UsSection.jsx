const UsSection = ({
  id,
  eyebrow,
  title,
  sub,
  align = 'left',
  className = '',
  children,
}) => {
  const center = align === 'center';
  return (
    <section id={id} className={`us-section ${className}`}>
      <div className="us-container">
        <div className={center ? 'us-section-head-center' : 'us-section-head'}>
          <div className="us-section-head-text">
            {eyebrow && <span className="us-section-eyebrow">{eyebrow}</span>}
            {title && <h2>{title}</h2>}
            {sub && <p>{sub}</p>}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default UsSection;
