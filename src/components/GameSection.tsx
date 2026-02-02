import GameIframe from './GameIframe'

export default function GameSection() {
  return (
    <section id="game" className="py-24 px-4 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            PixelSpace
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-6">
            Videojuego 2D desarrollado en Godot Engine y exportado a WebAssembly.
            <br></br>
            Sprites realizados en Pixelorama.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Godot Engine</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">WebAssembly</span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">Game Development</span>
          </div>
        </div>
        <GameIframe />
      </div>
    </section>
  )
}

