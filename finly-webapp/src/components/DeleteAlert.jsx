
const DeleteAlert = ({ content,onDelete, onClose }) => {
  return (
   <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
    <p className="text-gray-700 text-lg mb-6 text-center">{content}</p>
    <div className="flex justify-end space-x-4">
         <button 
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={onDelete}
            type="button"
        >
            Delete
        </button>
        <button 
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            onClick={onClose}
            type="button"
        >
            Cancel
        </button>
    </div>
   </div>
  );
};

export default DeleteAlert;
