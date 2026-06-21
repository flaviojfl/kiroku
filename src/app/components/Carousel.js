"use client";

import { useState } from "react";

export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="space-y-4">
      {/* Main Display */}
      <div className="relative overflow-hidden rounded-xl2 border border-sumi/10 bg-nuvem shadow-card">
        <div className="aspect-video w-full">
          {currentItem.tipo === "video" ? (
            <video src={currentItem.url} controls className="h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentItem.url} alt="Galeria" className="h-full w-full object-cover" />
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-sumi/50 p-2 text-white hover:bg-sumi"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-sumi/50 p-2 text-white hover:bg-sumi"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {items.map((item, index) => (
            <button
              key={item.idImagem}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                index === currentIndex ? "border-sakura" : "border-transparent"
              }`}
            >
              {item.tipo === "video" ? (
                <div className="flex h-full w-full items-center justify-center bg-sumi/10">
                  <span className="text-2xl">▶</span>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
