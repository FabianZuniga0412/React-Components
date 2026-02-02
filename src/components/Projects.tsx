interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  status?: 'coming-soon' | 'in-progress' | 'completed'
}

function ProjectCard({ title, description, technologies, status = 'coming-soon' }: ProjectCardProps) {
  const statusColors = {
    'coming-soon': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'completed': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  }

  const statusLabels = {
    'coming-soon': 'Próximamente',
    'in-progress': 'En desarrollo',
    'completed': 'Completado',
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {

  const projects = [
    {
      title: 'Proyecto React UI',
      description:
        'Showcase de componentes UI desarrollados en React, con enfoque en reutilización, diseño y buenas prácticas de frontend.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      status: 'completed' as const,
    },
    {
      title: 'Sistema de Gestión',
      description:
        'Plataforma completa para gestión de recursos con dashboard interactivo, autenticación y API REST. Enfocado en experiencia de usuario y rendimiento.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      status: 'in-progress' as const,
    },
    {
      title: 'App Móvil',
      description:
        'Aplicación móvil multiplataforma con funcionalidades avanzadas. Próximamente disponible en iOS y Android.',
      technologies: ['React Native', 'TypeScript', 'Firebase'],
      status: 'coming-soon' as const,
    },
  ]

  return (
    <section id="projects" className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades en desarrollo frontend y software.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

