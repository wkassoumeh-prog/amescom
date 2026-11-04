export function Honeypot() {
  return (
    <div className="honeypot" aria-hidden="true">
      <label>
        Leave blank
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
