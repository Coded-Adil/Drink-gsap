'use client';
import { useRef, useState } from "react";
import { sliderLists } from "../../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Menu = () => {
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef();
    
    const totalCocktails = sliderLists.length;

    const goToSlide = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails;
        setCurrentIndex(newIndex);
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails];
    }

    const currentCocktail = getCocktailAt(0);
    const nextCocktail = getCocktailAt(1);
    const prevCocktail = getCocktailAt(-1);

    useGSAP(() => {

        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#menu',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        });

        parallaxTimeline
        .from('#m-right-leaf', { 
            y: 200,
        })
        .from('#m-left-leaf', { 
            x: -200,
            y: 100,
        }, '<')

        gsap.fromTo('title', 
        { opacity: 0 }, 
        { opacity: 1, duration: 1 });

        gsap.fromTo('.cocktail img', 
        { xPercent: -100, opacity: 0 }, 
        { xPercent: 0, opacity: 1, duration: 1, ease: "power1.out" });

        gsap.fromTo('.details h2', 
            {yPercent: 100, opacity: 0},
            {yPercent: 0, opacity: 1, duration: 1, ease: "power1.out"}
        )

        gsap.fromTo('.details p', 
            {yPercent: 100, opacity: 0},
            {yPercent: 0, opacity: 1, duration: 1, ease: "power1.out"}
        )
    }, [currentIndex]);


    return (
        <section id="menu" area-labeledby="menu-heading">
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

            <h2 id="menu-heading" className="sr-only">Cocktail Menu</h2>

            <nav className="cocktail-tabs" area-label="Cocktail Navigation">
                {sliderLists.map((cocktail, index) => {
                    const isActive = index === currentIndex;

                    return (
                        <button
                            key={cocktail.id} 
                            className={`cocktail-tab ${isActive ? 
                            'text-white border-white' : 
                            'text-white/50 border-white/50 hover:text-white hover:border-white'}`} 
                            onClick={() => goToSlide(index)}>
                                {cocktail.name}
                        </button>
                    );
                })}
            </nav>

            <div className="content">
                <div className="arrows">
                    <button className="text-left" onClick={() => {goToSlide(currentIndex - 1)}}>
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" area-hidden="true" />
                    </button>
                    <button className="text-left" onClick={() => {goToSlide(currentIndex + 1)}}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" area-hidden="true" />
                    </button>
                </div>

                <div className="cocktail">
                    <img src={currentCocktail.image} alt={currentCocktail.name} className="object-contain" />
                </div>

                <div className="recipe">
                    <div ref={contentRef} className="info">
                        <p>Recipe for:</p>
                        <p id="title">{currentCocktail.name}</p>
                    </div>

                    <div className="details">
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Menu;