
const DeleteAlert = ({ content, onDelete, onClose, loading }) => {
  return (
   <div >
    <p className="text-gray-700 text-lg mb-6 text-center">{content}</p>
    <div className="flex justify-end space-x-4">
         <button 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400"
            onClick={onDelete}
            disabled={loading}
            type="button"
        >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Deleting...
              </span>
            ) : "Delete"}
        </button>
        <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={onClose}
            type="button"
            disabled={loading}
        >
            Cancel
        </button>
    </div>
   </div>
  );
};

export default DeleteAlert;
