import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
        Contact Us
      </h2>
      <form className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 transition-colors duration-300">
        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your message..."
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
