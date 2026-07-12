export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-dark text-white">
      <h1 className="text-6xl font-black mb-4 text-brand-orange">404</h1>
      <p className="text-xl">Página no encontrada</p>
      <a href="/" className="mt-8 text-brand-orange underline">Volver al inicio</a>
    </div>
  )
}
