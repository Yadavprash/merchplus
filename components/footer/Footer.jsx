import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 mt-10 pt-10 font-montserrat text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
                    {/* Logo and description */}
                    <div className="flex flex-col w-full md:w-1/4">
                        <div className="flex flex-col justify-center items-start">
                            <div className="flex">
                                <Image
                                    src={'/images/logo.png'}
                                    alt={'Merch Plus'}
                                    width={100}
                                    height={100}
                                    className="rounded-2xl"
                                />
                                <div className="ml-4 flex items-center">
                                    <p className="text-gray-300 text-sm">
                                        Your go-to hub for all things anime, manga, and cosplay. Dive into a world of curated content, vibrant communities, and endless otaku excitement!
                                    </p>
                                </div>
                            </div>
                            <div className="mt-8 text-center text-gray-400 text-sm">
                                <p>© 2024, MerchPlus Made With ❤️</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                        <div className="flex flex-col space-y-2">
                            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</Link>
                            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</Link>
                            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Twitter</Link>
                            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</Link>
                            <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">YouTube</Link>
                        </div>
                    </div>

                    {/* Information Links */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-2">Information</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li><Link href="/" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                            <li><Link href="/" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="/" className="text-gray-400 hover:text-white">Return & Refund Policy</Link></li>
                            <li><Link href="/" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
                            <li><Link href="/" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                        <p className="text-gray-400">Phone: <a href="tel:+13109614914" className="hover:text-white">+91 707-806-3070</a></p>
                        <p className="text-gray-400">Email: <a href="mailto:info@MerchPlus.com" className="hover:text-white">info@MerchPlus.com</a></p>
                        <p className="text-gray-400 w-64">Address: D-15 Baba Bhawan Sec 58 Noida 201301 INDIA</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
