import Image from 'next/image';
import ParthImage from '@/../public/parth.JPG';
const Login = () => {
  return (
    <div className="w-full h-fit">
      <div
        className="m-5 rounded-3xl overflow-hidden shadow-2xl "
        // style={{ boxShadow: '2px 2px 5px gray' }}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Image
              src={ParthImage}
              className="w-[100%] lg:h-[610px] md:h-[800px] sm:h-[400px] h-full"
            />
          </div>
          <div className="flex-1  flex justify-center items-center">
            <div className="w-[100%] max-w-[450px] py-4 px-2">
              <h1 className="text-3xl font-semibold mb-10">
                Login to your Account
              </h1>
              <div className="flex flex-col mb-5">
                <label className="text-[18px] text-gray-500">Email</label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="border outline-none p-2"
                />
              </div>
              <div className="flex flex-col mb-5">
                <label className="text-[18px] text-gray-500">Password</label>
                <input
                  type="text"
                  placeholder="Enter your password"
                  className="border outline-none p-2"
                />
              </div>
              <button className="w-full rounded-md bg-purple-900 text-white font-semibold text-[18px] tracking-wider py-2 mt-6">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
