export default function HelpButton({onClick}: {onClick: () => void}) {
  return (
    <div className="flex-row justify-end">
      <button
        type="button"
        className="highlight self-start relative pointer-events-auto"
        onClick={onClick}
      >
        <div className="i-tabler-help h-8 w-8" />
        <div className="text-sm">help</div>
      </button>
    </div>
  );
}
