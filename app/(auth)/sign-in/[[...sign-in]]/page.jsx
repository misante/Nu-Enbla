import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex items-end bg-gray-900 lg:col-span-5 xl:col-span-6">
          <Image
            alt="derek_tibs"
            height={650}
            width={650}
            src="/derek_tibs.jpg"
            className="absolute object-contain inset-0"
          />

          <div className="hidden lg:relative lg:block lg:p-2">
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to ኑ እንብላ
            </h2>

            <p className="mt-4 leading-relaxed text-white/90 from-stone-800">
              Welcome to our culinary haven! Explore a diverse array of
              restaurants offering mouthwatering dishes at your fingertips.
              Whether you crave exotic flavors, comforting classics, or trendy
              bites, our user-friendly platform connects you to the best dining
              experiences in town. Order now and indulge in gastronomic delight!
            </p>
          </div>
        </section>
        <div className="mx-20 mt-10">
          <SignIn />
        </div>
      </div>
    </section>
  );
}
