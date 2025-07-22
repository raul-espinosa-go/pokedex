import X from "./icons/X.jsx";

function Modal({ children, isOpen, onClose }) {
    if (!isOpen) return null;
    

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div
                className="bg-white rounded-lg shadow-lg p-6 relative z-10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    <X />
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
