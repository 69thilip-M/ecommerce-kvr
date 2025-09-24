/* eslint-disable no-unused-vars */
// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import productsData from "../pages/productsData";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

function Home() {
  const navigate = useNavigate();

  // Intersection observer to trigger animations
  const sectionRefs = useRef([]);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      sectionRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [controls]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <motion.div
        className="relative flex flex-col items-center justify-center text-center flex-grow bg-green-100 dark:bg-gray-800"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <img
          src="https://media.giphy.com/media/l3vQ6bJkY8dVZ2E1C/giphy.gif"
          alt="Fresh veggies gif"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-3xl px-6 py-10">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-green-800 dark:text-green-300 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          >
            Fresh Fruits & Veggies 🍎🥦
          </motion.h1>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5, duration: 1 } }}
          >
            Get your favorite groceries delivered straight to your home with
            love & freshness.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 1, duration: 0.8 },
            }}
          >
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-lg hover:bg-green-700 transition"
              onClick={() => navigate("/products")}
            >
              Shop Now 🛒
            </button>
            <button
              className="px-6 py-3 bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 border border-green-600 rounded-xl shadow hover:bg-green-50 dark:hover:bg-gray-600 transition"
              onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature Section */}
      <motion.div
        className="bg-white dark:bg-gray-800 py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
        ref={(el) => (sectionRefs.current[0] = el)}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        {[
          {
            img: "https://cdn-icons-png.flaticon.com/512/415/415733.png",
            title: "100% Fresh",
            desc: "Only the best quality fruits & veggies, handpicked for you.",
          },
          {
            img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
            title: "Fast Delivery",
            desc: "Get your groceries delivered within hours at your doorstep.",
          },
          {
            img: "https://cdn-icons-png.flaticon.com/512/744/744922.png",
            title: "Best Prices",
            desc: "Freshness doesn’t have to be expensive — we keep it affordable.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <img
              src={feature.img}
              alt={feature.title}
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Best Selling Section */}
      <motion.div
        className="bg-white dark:bg-gray-900 py-16 px-6 text-center"
        ref={(el) => (sectionRefs.current[1] = el)}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        <h2 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-8">
          Best Sellers 🌟
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {productsData.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              className="bg-green-50 dark:bg-gray-700 shadow rounded-xl p-6 hover:shadow-lg transition"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 mx-auto mb-4 rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {product.description}
              </p>
              <p className="mt-2 font-bold text-green-800 dark:text-green-300">
                ₹{product.price}
              </p>
              <button
                onClick={() => navigate("/products")}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                View More 🛒
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Section */}
      <motion.div
        ref={(el) => (sectionRefs.current[2] = el)}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        <Newsletter />
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        ref={(el) => (sectionRefs.current[3] = el)}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        <Testimonials />
      </motion.div>

      <Footer />
    </div>
  );
}

export default Home;
