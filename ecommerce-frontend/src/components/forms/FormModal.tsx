import React from 'react';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    onSubmit?: () => void;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, title, children, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div>
                    {children}
                </div>
                {onSubmit && (
                    <div className="mt-4 flex justify-end">
                        <button type="submit" onClick={onSubmit} className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark focus:outline-none">Salvar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormModal;