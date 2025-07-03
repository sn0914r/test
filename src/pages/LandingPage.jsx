import AboutUs from "../components/AboutUs/AboutUs"
import ContactUs from "../components/ContactUs/ContactUs"
import Hero from "../components/Hero/Hero"
import Projects from "../components/Projects/Projects"
import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs"

export default function LandingPage(){
    return(
        <>
            <Hero/>
            <AboutUs/>
            <WhyChooseUs/>
            <Projects/>
            <ContactUs/>
        </>
    )
}