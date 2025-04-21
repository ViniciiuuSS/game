export default function XButton() {
  return (
    <button
      className="retro-button blue-button X-button"
      style={
        {
          "--color-bg": "#899095",
          "--color-bg-light": "#969da3",
          "--color-bg-dark": "#7d878f",
        } as React.CSSProperties
      }
      disabled
    >
      X
    </button>
  );
}
