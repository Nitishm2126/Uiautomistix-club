import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon, ZoomIn } from 'lucide-react'
import { galleryImages } from '../data/gallery'

/* ============================================================
   ANIMATION CONSTANTS
   ============================================================ */
const EASE = [0.16, 1, 0.3, 1]

const categories = ["All", "Events", "Workshops", "Team", "Competitions", "Activities"]

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState(null)

  // Filter images based on selected category
  const filteredImages = galleryImages.filter(img => 
    activeCategory === "All" ? true : img.category === activeCategory
  )

  // Handlers for Lightbox navigation
  const openLightbox = (index) => {
    setLightboxIndex(index)
  }

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const navigateLightbox = useCallback((direction) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null
      const count = filteredImages.length
      if (count === 0) return null
      let nextIndex = prev + direction
      if (nextIndex < 0) nextIndex = count - 1
      if (nextIndex >= count) nextIndex = 0
      return nextIndex
    })
  }, [filteredImages.length])

  // Keyboard navigation & scroll locking
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigateLightbox(1)
      if (e.key === 'ArrowLeft') navigateLightbox(-1)
    }

    // Scroll locking
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, navigateLightbox])

  return (
    <section
      id="gallery"
      aria-label="Gallery Section"
      style={{
        background: '#0D0D0D', // Alternates with #0A0A0A (Events)
        padding: 'clamp(4rem, 8vw, 7rem) 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Accent Radial Glow */}
      <div
        className="absolute top-1/2 right-1/4 pointer-events-none"
        style={{
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(246,65,36,0.03) 0%, transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translateY(-50%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto relative z-10">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12 lg:mb-16"
        >
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#F64124',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            Snapshots & Moments
          </span>
          <h2
            style={{
              fontFamily: 'Space Grotesk, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            Gallery
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '0.75rem',
            }}
          >
            Explore moments from Sairam UiAutomistix Club.
          </p>
        </motion.div>

        {/* ── Filter Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  // Reset lightbox if filtering
                  closeLightbox()
                }}
                className="transition-all duration-200 text-xs sm:text-sm font-semibold rounded-full px-5 py-2.5"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: isSelected ? '#F64124' : 'rgba(255,255,255,0.02)',
                  color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                  border: isSelected ? '1px solid #F64124' : '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(246,65,36,0.25)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(246,65,36,0.3)'
                    e.currentTarget.style.background = 'rgba(246,65,36,0.04)'
                    e.currentTarget.style.color = '#FFFFFF'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                  }
                }}
              >
                {cat}
              </button>
            )
          })}
        </motion.div>

        {/* ── Masonry Grid Layout ── */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, idx) => (
              <motion.div
                layout
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{
                  border: '1px solid rgba(255,255,255,0.04)',
                  background: 'rgba(255,255,255,0.01)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                onClick={() => openLightbox(idx)}
              >
                {/* Image Container */}
                <div className="w-full h-full overflow-hidden relative">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ display: 'block', height: 'auto' }}
                  />
                  
                  {/* Subtle hover overlay gradient */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                    }}
                  >
                    <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-2 backdrop-blur-sm border border-white/10 scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ZoomIn size={16} color="#F64124" strokeWidth={2.2} />
                    </div>

                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#F64124',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.25rem',
                        display: 'block',
                      }}
                    >
                      {image.category}
                    </span>
                    <h4
                      style={{
                        fontFamily: 'Space Grotesk, Inter, sans-serif',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {image.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty State if no images match filter ── */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <ImageIcon size={40} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/40 text-sm">No images in this category.</p>
          </div>
        )}
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div 
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                style={{ cursor: 'pointer' }}
                aria-label="Close Lightbox"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* Left navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox(-1)
              }}
              className="absolute left-4 sm:left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              style={{ cursor: 'pointer' }}
              aria-label="Previous Image"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </button>

            {/* Center Area: Big Image and Details */}
            <div 
              className="relative max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filteredImages[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EASE }}
                src={filteredImages[lightboxIndex].imageUrl}
                alt={filteredImages[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {/* Caption details below image */}
              <div className="w-full text-center mt-4">
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#F64124',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {filteredImages[lightboxIndex].category}
                </span>
                <h3
                  style={{
                    fontFamily: 'Space Grotesk, Inter, sans-serif',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    marginTop: '0.25rem',
                  }}
                >
                  {filteredImages[lightboxIndex].title}
                </h3>
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox(1)
              }}
              className="absolute right-4 sm:right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              style={{ cursor: 'pointer' }}
              aria-label="Next Image"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
