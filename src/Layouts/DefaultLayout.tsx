import { Link } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Main Contents */}
      <div className="flex-1 overflow-y-scroll pb-16 md:pb-0 md:pl-20">
        <div className="bg-amber-800">Main Contents</div>
      </div>

      {/* Menu Bar */}
      <div className="fixed w-full h-16 bottom-0 left-0 border border-gray-700 shadow- md:w-20 md:h-full md:top-0 md:left-0">
        <div className="flex h-full justify-around items-center md:flex-col">
          {/* Navigation Icon */}
          <Link
            to={'/'}
            className="flex-1 text-sm flex flex-col md:justify-center items-center hover:cursor-pointer"
          >
            <img
              src="src/assets/CheckIcon.png"
              alt="맞춤법 검사"
              width={25}
              className="text-black"
            />
            맞춤법 검사
          </Link>
          {/* Divider */}
          <div className="w-px h-12 bg-gray-300 md:w-12 md:h-px"></div>
          {/* Navigation Icon */}
          <Link
            to={'/summary'}
            className="flex-1 text-sm flex flex-col md:justify-center items-center hover:cursor-pointer"
          >
            <img src="src/assets/DocsIcon.png" alt="오답 정리" width={25} className="text-black" />
            오답 정리
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
