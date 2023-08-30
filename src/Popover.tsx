export default function Popover({
  message,
  imageSource,
}: {
  message: string;
  imageSource: string;
}) {
  return (
    <div className="w-full p-4 h-full justify-center items-center text-xl bg-gray-800 bg-opacity-85">
      <div className="bg-black rounded-md shadow-gray-300 shadow-xl border-3 border-gray-700 bg-opacity-60">
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
