import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <div>

            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div >
                    <img src={assets.logo} className="mb-5 w-32" alt="" />
                    <p className="w-full ms:w-2/3 text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia quidem labore sit iusto aut deleniti praesentium dolorum nisi inventore doloremque amet eaque tempore, in ipsa, reprehenderit temporibus accusantium consequuntur ex, asperiores voluptates! Voluptatibus adipisci facilis eaque nostrum animi, cupiditate hic.</p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">Get In Touch</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li>+1-888-444-2222</li>
                        <li>contact@varnika.com</li>
                    </ul>
                </div>  
            </div>

                <div>
                    <hr />
                    <p className="py-5 text-sm text-center">Copyright 2024@ varnika.com - All Right Reserved</p>
                </div>
        </div>
    )
}

export default Footer