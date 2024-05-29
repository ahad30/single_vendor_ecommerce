const SaveAndCloseButton = ({
  title,
  isLoading,
  closeModal,
}: {
  title: string;
  isSuccess: boolean;
  isLoading: boolean;
  closeModal: () => void;
}) => {
  return (
    <div className="flex items-center gap-x-3 justify-end">
      <button
        disabled={isLoading}
        onClick={() => closeModal()}
        disabled:cursor-not-allowed
        type="button"
        className="bg-gray-200 disabled:cursor-not-allowed text-center text-gray-600 w-full lg:w-[200px] h-[45px] rounded-md"
      >
        Close
      </button>
      <button
        disabled={isLoading}
        type="submit"
        className="bg-[#24354C] disabled:bg-[#4f5a67] disabled:cursor-not-allowed text-center text-white w-full lg:w-[200px] h-[45px] rounded-md"
      >
        {isLoading ? "Processing..." : title}
      </button>
    </div>
  );
};

export default SaveAndCloseButton;
