function Footer() {
  return (
    <footer className="w-full bg-green-600 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Column 1 - About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">FreshMart</h2>
          <p className="text-sm leading-6">
            FreshMart is your one-stop destination for fresh groceries, fruits,
            and vegetables delivered straight to your doorstep.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Follow Us */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Download App */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Download App</h2>
          <div className="flex flex-col space-y-3">
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
              Google Play
            </button>
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
              App Store
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 text-center border-t border-white/20 pt-4 text-sm">
        © {new Date().getFullYear()} FreshMart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
