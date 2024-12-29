import React, { useState, useEffect, useRef } from "react";
import "../App.css"; 

const paragraphs = [
  "Authors often interpret the lettuce as a folklore rabbi, when in actuality it feels more like an uncursed bacon. Pursued distances show us how mother-in-laws can be Charleses. Authors often misinterpret the lion as a cumbersome science, when in actuality it feels more like a leprous lasagna. Recent controversy aside, their band was, in this moment, a raced suit. The clutch of a joke becomes a togaed chair. The first pickled chess is.",
  
  "In modern times, the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind. A recorder is a grade from the right perspective. A hygienic is the cowbell of a skin. Few can name a dun Brazil that isn't a highbrow playroom. The unwished beast comes from a thorny oxygen. An insured advantage's respect comes with it the thought that the lucid specialist is a fix.",
  
  "In ancient times, the legs could be said to resemble stroppy vegetables. We can assume that any instance of a centimeter can be construed as an enate paste. One cannot separate pairs from astute managers. Those Americas are nothing more than fish. If this was somewhat unclear, authors often misinterpret the gosling as an unfelt banjo, when in actuality it feels more like a professed galley. A bow of the squirrel is assumed.",
  
  "What we don't know for sure is whether or not a pig of the coast is assumed to be a hardback pilot. The literature would have us believe that a dusky clave is not but an objective. Few can name a limbate leo that isn't a sunlit silver. The bow is a mitten. However, the drawer is a bay. If this was somewhat unclear, few can name a punchy blue that isn't a conoid bow. The undrunk railway reveals itself as a downstage bamboo to those who look.",
  
  "Their politician was, in this moment, a notour paperback. The first armless grouse is, in its own way, a gear. The coat is a wash. However, a cake is the lamma of a caravan. Snakelike armies show us how playgrounds can be viscose. Framed in a different way, they were lost without the fatal dogsled that composed their waitress. Far from the truth, the cockney freezer reveals itself as a wiggly tornado to those who look. The first hawklike sack.",
  
  "An aunt is a bassoon from the right perspective. As far as we can estimate, some posit the melic Myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerosus lamma to those who look. A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids. A gum is a trumpet from the right perspective. A freebie flight is a wrench of the mind. Some posit the croupy.",
  
  "A baby is a shingle from the right perspective. Before defenses, collars were only operations. Bails are gleesome relatives. An alloy is a streetcar's debt. A fighter of the scarecrow is assumed to be a leisured laundry. A stamp can hardly be considered a peddling payment without also being a crocodile. A skill is a meteorology's fan. Their scent was, in this moment, a hidden feeling. Their twist was, in this moment.",
  
  "Authors often misinterpret the flag as a wayless trigonometry, when in actuality it feels more like a bousy gold. Few can name a jasper oven that isn't a stutter grape. They were lost without the huffy religion that composed their fowl. Those waves are nothing more than pedestrians. Few can name a quartered semicolon that isn't a rounding scooter. Though we assume the latter, the literature would have us believe.",
  
  "This could be, or perhaps few can name a pasteboard quiver that isn't a brittle alligator. A swordfish is a death's numeric. Authors often misinterpret the mist as a swelling asphalt, when in actuality it feels more like a crosswise closet. Some posit the tonal brother-in-law to be less than newborn. We know that the sizes could be said to resemble sleepwalk cycles. Before seasons, supplies were only fighters. Their stew was, in this moment.",
  
  "The bicycle of thought is often a nebulous tube, sprawling over endless paths like a fragmented dream. One could argue that the aroma of rain is only a prelude to deeper philosophical questions about the nature of perception. A forest is a living canvas, where each leaf narrates a tale of endurance. Far from the truth, a child’s laughter may contain echoes of the universe itself.",
  
  "Is it not peculiar that the clouded sky might seem like a mirror of the inner workings of our minds? A paper lantern glows as if offering enlightenment, although its flame is but a fleeting shadow. In the same breath, a clumsy dance of fireflies reminds us that everything, no matter how erratic, holds its place in the grand design of things. The wind whispers secrets only those who listen intently can understand.",
  
  "What is the color of thought, and does it change with the ebb and flow of time? Perhaps the winds of fortune, always unpredictable, act like waves upon the shore, reshaping our thoughts and destinies. A broken compass seems to know its way better than we do. In the end, maybe we are just wanderers through a maze of metaphors, seeking our way with each step we take.",
  
  "An echo carries the remnants of something once spoken, much like memories fade into the background of our lives. What are we, if not echoes of those who came before us, carrying their hopes and dreams in our hearts? The horizon seems to stretch endlessly, offering a promise of new beginnings. Yet, every journey we embark upon is a paradox, for it leads us both forward and back in time.",
  
  "It is said that the key to understanding the universe lies in the simplest of things—an apple, a star, or the fleeting passage of a moment. The river’s flow mirrors the course..."
];


const TypingSpeedTest = () => {
    const [timeLeft, setTimeLeft] = useState(60);
    const [mistakes, setMistakes] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [cpm, setCpm] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [paragraph, setParagraph] = useState("");
    const timerRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        loadParagraph();
        return () => clearInterval(timerRef.current);
    }, []);

    const loadParagraph = () => {
        const randomIndex = Math.floor(Math.random() * paragraphs.length); 
        setParagraph(paragraphs[randomIndex]);
        setCharIndex(0);
        setMistakes(0);
        setTimeLeft(60);
        setWpm(0);
        setCpm(0);
        setIsTyping(false);
        setGameOver(false); 
        resetTextColors();
    };

    const resetTextColors = () => {
        const textElements = document.querySelectorAll(".typing-text span");
        textElements.forEach((element) => {
            element.classList.remove("correct", "incorrect", "blue");
        });
    };

    const calculateAccuracy = () => {
        const totalCharacters = paragraph.length;
        return Math.round(((totalCharacters - mistakes) / totalCharacters) * 100);
    };

    const calculateSpeed = () => {
        const totalTime = 60 - timeLeft;
        const speed = totalTime > 0 ? Math.round(((charIndex - mistakes) / 5 / totalTime) * 60) : 0;
        return speed;
    };

    const handleKeyPress = (e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            if (charIndex > 0) {
                setCharIndex(charIndex - 1);
                const previousChar = document.getElementById(`char-${charIndex - 1}`);
                previousChar.classList.add("blue");
                const prevCharElement = document.getElementById(`char-${charIndex}`);
                prevCharElement.classList.remove("correct", "incorrect");
                for (let i = charIndex; i < paragraph.length; i++) {
                    const nextChar = document.getElementById(`char-${i}`);
                    nextChar.classList.remove("correct", "incorrect");
                    nextChar.classList.remove("blue");
                }
            }
            return;
        }

        const characters = paragraph.split("");
        if (!isTyping) {
            setIsTyping(true);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current); 
                        setGameOver(true); 
                        return 0; 
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        const typedChar = e.key;
        if (typedChar === "Shift" || typedChar === "CapsLock" || typedChar === "Control" || typedChar === "Alt") {
            return;
        }

        if (timeLeft <= 0) {
            clearInterval(timerRef.current);
            return;
        }

        if (charIndex < characters.length && timeLeft > 0) {
            const currentChar = document.getElementById(`char-${charIndex}`);
            currentChar.classList.remove("correct", "incorrect");
            if (typedChar === characters[charIndex]) {
                currentChar.classList.add("correct");
            } else {
                setMistakes(mistakes + 1);
                currentChar.classList.add("incorrect");
            }
            const previousChar = document.getElementById(`char-${charIndex}`);
            previousChar.classList.remove("blue");
            setCharIndex(charIndex + 1);
            const nextChar = document.getElementById(`char-${charIndex + 1}`);
            if (nextChar) {
                nextChar.classList.add("blue");
            }
            const currentWpm = Math.round(((charIndex - mistakes) / 5 / (60 - timeLeft)) * 60);
            setWpm(currentWpm > 0 ? currentWpm : 0);
            setCpm(charIndex - mistakes);
        }
    };

    const resetGame = () => {
        clearInterval(timerRef.current);
        loadParagraph();
    };

    useEffect(() => {
        wrapperRef.current.focus();
    }, []);

    return (
        <div className="wrapper" tabIndex={0} ref={wrapperRef} onKeyDown={handleKeyPress}>
            <div className="content-box">
                <div className="typing-text">
                    {paragraph.split("").map((char, index) => (
                        <span key={index} id={`char-${index}`} className={index === 0 ? "blue" : ""}>
                            {char}
                        </span>
                    ))}
                </div>
                <div className="content">
                    <ul className="result-details">
                        <li className="time">
                            <p>Time Left:</p>
                            <span><b>{timeLeft}</b>s</span>
                        </li>
                        <li className="mistake">
                            <p>Mistakes:</p>
                            <span>{mistakes}</span>
                        </li>
                        {gameOver && (
                            <>
                                <li className="accuracy">
                                    <p>Accuracy:</p>
                                    <span>{calculateAccuracy()}%</span>
                                </li>
                                <li className="speed">
                                    <p>Speed:</p>
                                    <span>{calculateSpeed()} WPM</span>
                                </li>
                            </>
                        )}
                        <li className="wpm">
                            <p>WPM:</p>
                            <span>{wpm}</span>
                        </li>
                        <li className="cpm">
                            <p>CPM:</p>
                            <span>{cpm}</span>
                        </li>
                    </ul>
                    <button onClick={resetGame}>Try Again</button>
                </div>
            </div>
        </div>
    );
};

export default TypingSpeedTest;
