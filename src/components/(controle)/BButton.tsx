export default function BButton() {
  return (
    <button 
      className="retro-button B-button" 
      style={{
        '--color-bg': '#899095',
        '--color-bg-light': '#969da3', 
        '--color-bg-dark': '#7d878f'
      } as React.CSSProperties}
      disabled
    >
      B
    </button>
  );
}
