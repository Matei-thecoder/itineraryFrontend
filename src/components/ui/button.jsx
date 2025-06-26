export function Button({ children, ...props }) {
  return (
    <button
      className="bg-blue text-black px-4 py-2 rounded hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  )
}
