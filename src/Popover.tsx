export default function Popover({
  message,
  imageSource,
}: {
  message: string;
  imageSource: string;
}) {
  return (
    <div className="w-full p-4 h-full justify-center items-center bg-popover">
      <div className="popover-container">
        {imageSource && (
          <img className="p-2 object-contain" src={imageSource} />
        )}
        {message && <div className="p-6 text-center">{message}</div>}
        <div className="text-sm italic text-gray-300 px-4">
          click anywhere to close
        </div>
      </div>
    </div>
  );
}
