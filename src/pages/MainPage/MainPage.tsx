import style from "./styles/mainPage.module.scss";
import { fullLyric, SECOND } from "@/pages/MainPage/const";
import { useState, useEffect, useRef } from "react";
import heart from "@/assets/images/heart.png";

export default function MainPage() {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedLyric, setDisplayedLyric] = useState("");
  const [wordsList, setWordsList] = useState<string[]>();
  const [isWaiting, setIsWaiting] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsWaiting(false);
    }, 28 * SECOND);
  }, []);

  useEffect(() => {
    if (isWaiting) return;
    if (fullLyric.length <= currentLyricIndex) return;
    const { lyric, time } = fullLyric[currentLyricIndex];
    const words = lyric.split(" ");

    setWordsList(words);

    const intervalId = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedLyric(
          (prevLyric) => `${prevLyric} ${words[currentWordIndex]}`,
        );
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(intervalId);
        setDisplayedLyric("");
        setCurrentWordIndex(0);
        setCurrentLyricIndex((prevIndex) => prevIndex + 1);
      }
    }, (time * SECOND) / words.length);

    return () => clearInterval(intervalId);
  }, [currentLyricIndex, currentWordIndex, isWaiting]);
/**
 * Renders 20 heart images with random positions.
 * 
 * @returns {JSX.Element[]} Array of heart images.
 */
const usedPositions = new Set(); // Tập hợp để theo dõi vị trí đã được sử dụng

 const generatePosition = () => {
    let top, left;
    do {
        // Tạo giá trị ngẫu nhiên trong phạm vi từ 0 đến 100
        top =parseFloat((Math.random() * 80).toFixed(2));
        left = parseFloat((Math.random() * 80).toFixed(2));
    } while (usedPositions.has(`${top},${left}`)); // Tiếp tục lặp lại cho đến khi vị trí là duy nhất
    
    // Thêm vị trí đã chọn vào tập hợp
    usedPositions.add(`${top},${left}`);
    
    return { top, left };
};
const renderHeart = (): JSX.Element[] => {
  return [...Array(10)].map((_, index: number): JSX.Element => {
    const { top, left }: { top: number; left: number } = generatePosition();
    return (
      <img
        key={index}
        className={style.heart}
        style={{ top: `${top}%`, left: `${left}%` }}
        src={heart}
      />
    );
  });
};
const hearts = useRef<HTMLImageElement[]>(renderHeart());
  return (
    <div className={style.container}>
      {/* <audio controls autoPlay ref={audioRef}>
        <source src={music} type="audio/mp3" />
      </audio> */}
      {renderHeart()}
      {wordsList?.map((word, index) => (
        <p
          key={index}
          className={`${style.word} ${
            index <= currentWordIndex ? style.bounce : ""
          }`}
        >
          {word}
        </p>
      ))}
    </div>
  );
}
