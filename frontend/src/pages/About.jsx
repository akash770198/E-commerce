import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'Us'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi alias esse rem ratione asperiores sed quia iste at, dolor magni!</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore, ipsa. Corrupti deserunt dicta quam culpa pariatur provident fugit quaerat necessitatibus atque, odit, id optio quasi non numquam ad fuga veritatis. Quibusdam consequuntur aspernatur consectetur distinctio quod tempore exercitationem cupiditate cum.</p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A sint voluptatem repellendus ad soluta delectus magni, odit similique quasi iure inventore. Nam adipisci, ipsa repellat rerum quaerat pariatur commodi placeat sunt? Quaerat placeat porro enim laborum perferendis illo corrupti necessitatibus!</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum quo ut ex deserunt reiciendis maxime, velit obcaecati numquam sequi sapiente suscipit atque quaerat, quia magni alias laudantium, eligendi quos.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum quo ut ex deserunt reiciendis maxime, velit obcaecati numquam sequi sapiente suscipit atque quaerat, quia magni alias laudantium, eligendi quos.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae harum quo ut ex deserunt reiciendis maxime, velit obcaecati numquam sequi sapiente suscipit atque quaerat, quia magni alias laudantium, eligendi quos.</p>
        </div>
      </div>

      <NewsletterBox/>

    </div>
  )
}

export default About