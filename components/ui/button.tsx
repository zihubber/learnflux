export function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
}