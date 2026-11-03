import React, { useEffect, useState } from 'react';
import { interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { WordTimestamp } from '../types';

interface AnimatedCaptionsProps {
  initialWords?: WordTimestamp[];
}

export const AnimatedCaptions: React.FC<AnimatedCaptionsProps> = ({
  initialWords,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const [words, setWords] = useState<WordTimestamp[]>(initialWords || []);

  useEffect(() => {
    if (initialWords && initialWords.length > 0) return;

    fetch(staticFile('current/timestamps.json'))
      .then((res) => {
        if (!res.ok) return [];
        return res.json();
      })
      .then((data: WordTimestamp[]) => {
        if (Array.isArray(data)) {
          setWords(data);
        }
      })
      .catch(() => {
        setWords([]);
      });
  }, [initialWords]);

  if (words.length === 0) {
    return null;
  }

  // Find active word index
  const activeIndex = words.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end
  );

  // If between words, find upcoming word or keep recent word in a 0.4s window
  const displayIndex =
    activeIndex !== -1
      ? activeIndex
      : words.findIndex((w) => w.start > currentTime);

  if (displayIndex === -1 && currentTime > words[words.length - 1].end + 0.5) {
    return null;
  }

  const centerIdx = displayIndex !== -1 ? displayIndex : words.length - 1;
  const startIndex = Math.max(0, centerIdx - 2);
  const visibleWords = words.slice(startIndex, startIndex + 5);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 60,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 40px',
          backgroundColor: 'rgba(10, 15, 29, 0.88)',
          backdropFilter: 'blur(16px)',
          borderRadius: 9999,
          border: '1.5px solid rgba(255, 107, 0, 0.35)',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 107, 0, 0.2)',
        }}
      >
        {visibleWords.map((item, idx) => {
          const isActive = currentTime >= item.start && currentTime <= item.end;
          const wordProgress = isActive
            ? (currentTime - item.start) / Math.max(0.01, item.end - item.start)
            : 0;

          const scale = isActive
            ? interpolate(wordProgress, [0, 0.5, 1], [1, 1.18, 1.08], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1;

          return (
            <span
              key={`${item.word}-${item.start}-${idx}`}
              style={{
                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                fontWeight: isActive ? 900 : 600,
                fontSize: 34,
                color: isActive ? '#FF6B00' : 'rgba(255, 255, 255, 0.7)',
                textShadow: isActive
                  ? '0 0 24px rgba(255, 107, 0, 0.75), 0 0 40px rgba(255, 107, 0, 0.35)'
                  : 'none',
                transform: `scale(${scale})`,
                transition: 'color 0.08s ease, transform 0.08s ease',
                display: 'inline-block',
                letterSpacing: '-0.01em',
              }}
            >
              {item.word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
