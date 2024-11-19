import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div className="bg-slate-900 min-h-screen text-white flex flex-col items-center justify-center">
        <div className="max-w-4xl p-6 bg-slate-800 rounded-xl shadow-xl mt-10">
          <h1 className="text-3xl font-semibold text-center text-blue-500 mb-6">
            Thank you for choosing Shopping Essential
          </h1>

          <p className="text-lg text-center text-gray-300 leading-relaxed">
            We are glad that you have chosen our website for your shopping needs.
            Shopping Essential is dedicated to offering the best online shopping
            experience with a wide variety of products, excellent customer service, and
            seamless delivery options.
          </p>

          <p className="mt-6 text-lg text-center text-gray-300 leading-relaxed">
            Your satisfaction is our priority. We hope to serve you again and again.
            Happy shopping!
          </p>

          <div className="flex justify-center mt-8">
            <a
              href="/"
              className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition-all"
            >
              Go to Homepage
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
