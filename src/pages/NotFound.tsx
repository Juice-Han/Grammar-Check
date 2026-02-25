import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-red-500">404 Not Found</div>
      <div className="text-lg">잘못된 경로입니다!</div>
      <div className="text-sm text-gray-500">정상적인 경로로 다시 접속해주세요.</div>
      <Link
        to={'/'}
        className="text-lg text-white px-4 py-2 mt-3 rounded-xl bg-gray-600 hover:bg-gray-400"
      >
        홈으로{' '}
      </Link>
    </div>
  )
}

export default NotFound
