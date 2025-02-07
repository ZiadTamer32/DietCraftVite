function InstructionsList({ title, data }) {
  if (!data?.length) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold">{title}:</h2>
      <ul
        className={`pl-5 mt-2 space-y-2 max-h-40 pr-2 ${
          data?.length > 5
            ? "overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            : "overflow-hidden"
        } text-gray-700 list-decimal`}
      >
        {data?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default InstructionsList;
