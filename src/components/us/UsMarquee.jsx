const UsMarquee = ({ items = [] }) => {
  const track = [...items, ...items];
  return (
    <div className="us-trust">
      <div className="us-trust-viewport">
        <div className="us-trust-track">
          {track.map((t, i) => <span key={i} aria-hidden={i >= items.length}>{t}</span>)}
        </div>
      </div>
    </div>
  );
};

export default UsMarquee;
