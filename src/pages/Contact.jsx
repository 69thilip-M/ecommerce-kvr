import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_lubzihg", // replace with your EmailJS service ID
        "template_9zj1pxf", // replace with your EmailJS template ID
        formRef.current,
        "jLKuUYxKz8xJweHYf" // replace with your EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setSuccess("Message sent successfully! ✅");
          formRef.current.reset();
        },
        (error) => {
          console.error(error.text);
          setLoading(false);
          setSuccess("Failed to send message. ❌");
        }
      );
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">
        Contact Us
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 transition-colors duration-300"
      >
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
            name="user_name"
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
            name="user_email"
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
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {success && (
        <p className="mt-4 text-green-700 dark:text-green-400 font-semibold">
          {success}
        </p>
      )}
    </div>
  );
}

export default Contact;
