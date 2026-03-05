import Hero from './landing/Hero'
import About from './landing/About'
import HorizontalScroll from './landing/HorizontalScroll'
import FacultyAdvisor from './landing/FacultyAdvisor'
import GB from './landing/GB'
import FAQs from './landing/FAQs'
import Marque from './landing/marque'
import Carousel from './landing/Carousel'
import PageSEO from './PageSEO'

export default function Home() {
    return (
        <>
            <PageSEO title="IEEE CIS MJCET" />
            <Hero />
            <About />
            <Carousel />
            {/*<HorizontalScroll />*/}
            <FacultyAdvisor />
            <GB />
            <FAQs />
            <Marque />
        </>
    )
}
