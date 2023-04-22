function MarginPaddingController() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-gray-200 p-4 w-full">
        <MarginPaddingSquare />
      </div>
    </div>
  );
}

function MarginPaddingSquare() {
  return (
    <div className="relative bg-gray-400 p-4 w-full">
      <MarginSquare>
        <PaddingSquare />
      </MarginSquare>
    </div>
  );
}

function MarginSquare({ children }) {
  return (
    <div className="relative bg-gray-200 p-4 w-full">
      <div className="absolute inset-0 border-2 border-gray-400"></div>
      <InputSquare position="top" />
      <InputSquare position="right" />
      <InputSquare position="bottom" />
      <InputSquare position="left" />
      {children}
    </div>
  );
}

function PaddingSquare() {
  return (
    <div className="relative bg-gray-200 p-4 w-full">
      <div className="absolute inset-0 border-2 border-gray-400"></div>
      <InputSquare position="top" squareType="padding" />
      <InputSquare position="right" squareType="padding" />
      <InputSquare position="bottom" squareType="padding" />
      <InputSquare position="left" squareType="padding" />
    </div>
  );
}

function InputSquare({ position, squareType = "margin" }) {
  const className = `absolute inset-${position}-0 mx-2 my-2`;
  const borderColor = squareType === "padding" ? "gray-300" : "gray-500";
  return (
    <div className={className}>
      <input
        type="text"
        className={`w-full px-2 py-1 border border-${borderColor} rounded`}
      />
    </div>
  );
}

export default MarginPaddingController;