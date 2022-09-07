const ShowErrorForm = ({ label }) => {
  return (
    <div className="w-full text-base flex justify-start items-center">
      <p className="text-red-600">{label}</p>
    </div>
  );
};

export default ShowErrorForm;
