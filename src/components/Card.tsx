type CardProps = {
  title: string
  description: string
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="max-w-sm rounded-2xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <h2 className="mb-2 text-xl font-semibold text-gray-800">
        {title}
      </h2>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}