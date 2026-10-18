import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectToasts, removeToast } from '../../store/slices/toastSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const toasts = useSelector(selectToasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={() => dispatch(removeToast(toast.id))} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, toast.duration || 3000);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-indigo-500 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-emerald-500/20 dark:border-emerald-500/30';
      case 'error':
        return 'border-rose-500/20 dark:border-rose-500/30';
      default:
        return 'border-indigo-500/20 dark:border-indigo-500/30';
    }
  };

  return (
    <div
      className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border ${getBorderColor()} text-gray-800 dark:text-gray-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <p className="text-sm font-medium leading-snug">{toast.message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
