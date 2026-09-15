import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium shadow-xl border ${
                toast.type === 'success'
                  ? 'bg-[#1C251E] text-[#FAF7F2] border-[#2A352C]'
                  : toast.type === 'error'
                  ? 'bg-[#4A1D1D] text-[#FFF0F0] border-[#682727]'
                  : 'bg-[#2A352C] text-[#FAF7F2] border-[#3E4E42]'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#D5C9BD]" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-[#FFAEAE]" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-[#D5C9BD]" />}
              <span>{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/60 hover:text-white ml-2 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
