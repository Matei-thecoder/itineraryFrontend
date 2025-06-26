export function Card({ children, className = '' }) {
  return <div className={`bg-white text-black rounded-xl p-4 ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="mb-4 text-black">{children}</div>
}

export function CardTitle({ children }) {
  return <h2 className="text-xl text-center font-semibold text-black">{children}</h2>
}

export function CardContent({ children }) {
  return <div>{children}</div>
}
