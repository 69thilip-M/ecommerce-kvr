function About() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
        About Us
      </h1>

      {/* Company Info */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to{" "}
          <span className="font-semibold text-green-700">FreshMart</span> – your
          one-stop shop for fresh vegetables, fruits, and organic products. We
          are committed to delivering the best quality products directly from
          farms to your doorstep.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Founded in 2024, our mission is to make healthy and organic living
          accessible to everyone. With a wide range of fresh produce, we ensure
          that your family enjoys the goodness of nature every day.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Thank you for choosing FreshMart – where freshness meets trust. 🌱
        </p>
      </div>

      {/* Team Info */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Our Team</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <li className="bg-green-50 p-4 rounded-xl shadow">
            <h3 className="text-xl font-bold">Kural</h3>
            <p className="text-gray-600">Founder & CEO</p>
          </li>
          <li className="bg-green-50 p-4 rounded-xl shadow">
            <h3 className="text-xl font-bold">Thilip</h3>
            <p className="text-gray-600">Head of Operations</p>
          </li>
          <li className="bg-green-50 p-4 rounded-xl shadow">
            <h3 className="text-xl font-bold">Narmadha</h3>
            <p className="text-gray-600">Customer Relations</p>
          </li>
        </ul>
      </div>

      {/* Contact Us Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Contact Us
        </h2>
        <form className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Static Google Map */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Our Location
        </h2>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="FreshMart Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4742551580387!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670e943e8c7%3A0x1fbc!2sBangalore!5e0!3m2!1sen!2sin!4v1615189259969!5m2!1sen!2sin"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default About;
