import Dropzone from "../components/Dropzone"

export default function Home() {
  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-12">
      <div className="lg:flex lg:gap-5 md:shadow-lg bg-white rounded-lg py-10 px-5">
        <Dropzone />
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-sans font-bold text-gray-800 mb-3">Compartir archivos de forma sencilla y rápida</h2>
          <p className="text-lg leading-loose">
            <span className="text-red-500 font-bold">ReactNodeSand</span>
            {''} te permite compartir archivos con cifrado de extremo a extremo y se eliminan después de su descarga {'(si así lo deseas)'}. Así que puedes mantener lo que compartes en privado y asegurarte de que tus cosas no permanezcan en línea.
          </p>
        </div>
      </div>
    </div>
  )
}
