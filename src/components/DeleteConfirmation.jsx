
"use client";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-gray-900 border-4 border-red-700 shadow-2xl shadow-red-900/70 p-8 rounded-lg text-center max-w-md mx-4">
        <div className="text-8xl mb-4 animate-pulse">💀</div>
        <h2 className="text-2xl font-bold text-red-500 mb-4 uppercase">Tem certeza?</h2>
        <p className="text-gray-300 mb-8">
          Esta ação é irreversível. O filme será permanentemente apagado do seu registro.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 font-bold uppercase tracking-wider bg-gray-700 text-white border-2 border-gray-500 hover:bg-gray-600 transition-all duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 font-bold uppercase tracking-wider bg-red-800 text-white border-2 border-red-500 shadow-lg shadow-red-900 hover:bg-red-600 transition-all duration-200"
          >
            Sim, Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
