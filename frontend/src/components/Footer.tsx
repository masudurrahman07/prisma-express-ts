export default function Footer() {
  return (
    <footer className="footer">
      <div style={{maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 24, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        <div>
          <strong>Shoply</strong>
          <div style={{color: '#94a3b8'}}>Simple e-commerce frontend built with React + Vite</div>
        </div>
        <div style={{display: 'flex', gap: 18, color: '#94a3b8'}}>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
