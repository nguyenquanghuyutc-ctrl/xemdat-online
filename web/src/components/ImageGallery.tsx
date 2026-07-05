import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
        Chưa có ảnh
      </div>
    )
  }

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length)
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        className="block w-full overflow-hidden rounded-2xl bg-slate-100"
      >
        <img
          src={images[activeIndex]}
          alt={`${title} - ảnh ${activeIndex + 1}`}
          className="aspect-[4/3] w-full object-cover"
        />
      </button>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2">
          {images.map((img, index) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                index === activeIndex ? 'border-brand-600' : 'border-transparent'
              }`}
            >
              <img src={img} alt="" className="h-16 w-20 object-cover sm:h-20 sm:w-28" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            aria-label="Đóng"
            className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Ảnh trước"
              className="absolute left-2 text-4xl text-white/70 hover:text-white sm:left-6"
              onClick={(e) => {
                e.stopPropagation()
                goTo(activeIndex - 1)
              }}
            >
              ‹
            </button>
          )}

          <img
            src={images[activeIndex]}
            alt={`${title} - ảnh ${activeIndex + 1}`}
            className="max-h-full max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {images.length > 1 && (
            <button
              type="button"
              aria-label="Ảnh sau"
              className="absolute right-2 text-4xl text-white/70 hover:text-white sm:right-6"
              onClick={(e) => {
                e.stopPropagation()
                goTo(activeIndex + 1)
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  )
}
