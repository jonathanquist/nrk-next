export default function Loader() {
  return (
    <div className="flex justify-center items-center h-96 w-full">
      <div className="loader animate-ping ease-linear rounded-full border-4 border-t-4 border-primary-500 h-16 w-16 flex justify-center items-center ">
        <span className="text-primary-500 text-xs">Laddar</span>
      </div>
    </div>
  );
}
