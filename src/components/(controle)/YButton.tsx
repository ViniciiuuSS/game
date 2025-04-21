export default function YButton() {
  return (
    <button
      className="retro-button green-button Y-button"
      style={
        {
          "--color-bg": "#899095",
          "--color-bg-light": "#969da3",
          "--color-bg-dark": "#7d878f",
        } as React.CSSProperties
      }
      disabled
    >
      Y
    </button>
  );
}
