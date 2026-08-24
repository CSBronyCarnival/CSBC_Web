<template>
  <section class="musicians-section" :aria-label="$t('night.musiciansTitle')">
    <div class="musicians-header">
      <ScrollColorText
        as="div"
        class="musicians-subtitle"
        color1="#ebebeb34"
        color2="#72c2ff"
      >
        {{ $t('night.musiciansSubtitle') }}
      </ScrollColorText>
      <ScrollColorText
        as="h2"
        color1="#ebebeb34"
        color2="#e0e0e0"
      >
        {{ $t('night.musiciansTitle') }}
      </ScrollColorText>
    </div>

    <div
      v-for="(rowMusicians, row) in musicianRows"
      :key="row"
      class="musicians-row"
      :class="{ 'musicians-row--reverse': row % 2 === 1 }"
    >
      <div class="musicians-track">
        <div class="musicians-group">
          <figure
            v-for="musician in rowMusicians"
            :key="`${row}-${musician.name}`"
            class="musician-avatar"
          >
            <ImgLazy
              :src="musician.src"
              :alt="musician.name"
              eager
              no-spinner
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
        <div class="musicians-group" aria-hidden="true">
          <figure
            v-for="musician in rowMusicians"
            :key="`${row}-duplicate-${musician.name}`"
            class="musician-avatar"
          >
            <ImgLazy
              :src="musician.src"
              alt=""
              eager
              no-spinner
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </div>

    <div class="musicians-tagline" :data-text="$t('night.musiciansTagline')">
      {{ $t('night.musiciansTagline') }}
    </div>
  </section>
</template>

<script setup>
const musicianNames = [
  'aeotyr',
  'Allink',
  'bgpon',
  'C.R. Infinity Limit',
  'Camelia',
  'Choefeker',
  'Colorglint',
  'Dashie',
  'Everydaydashie',
  'GrieferPig',
  'Ladetaw',
  'Nightlight',
  'NoahChen',
  'noshrimp',
  'Rainko',
  'Rinne',
  'Ryazen',
  'Silvery SKY',
  'Starry Xplosion',
  'White',
  '旭日',
  '桃风',
  '海冰',
  '翊帆',
  '韵华',
  '7points',
]

const musicians = musicianNames.map((name) => ({
  name,
  src: `/img/night/musician/${name}.webp`,
}))

const shuffleMusicians = () => {
  const shuffled = [...musicians]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentMusician = shuffled[index]
    shuffled[index] = shuffled[randomIndex]
    shuffled[randomIndex] = currentMusician
  }

  return shuffled
}

const musicianRows = useState('night-musician-rows', () =>
  Array.from({ length: 3 }, shuffleMusicians),
)
</script>

<style scoped>
.musicians-section {
  position: relative;
  z-index: 1;
  padding: 72px 0 120px;
  overflow: hidden;
  background: transparent;
}

.musicians-header {
  width: min(1200px, 100%);
  margin: 0 auto 54px;
  padding: 0 32px;
  text-align: left;
  transform: rotate(-4deg);
  transform-origin: left center;
}

.musicians-subtitle {
  margin-bottom: 6px;
  font-size: 1.05rem;
  font-weight: 600;
}

.musicians-header h2 {
  margin: 0;
  font-size: clamp(2.75rem, 5vw, 4.5rem);
  line-height: 1.08;
  font-weight: 600;
}

.musicians-row {
  position: relative;
  overflow: hidden;
  margin: 18px 0;
  padding: 10px 0;
  transform: rotate(-4deg) scale(1.06);
  transform-origin: center;
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
}

.musicians-track {
  display: flex;
  width: max-content;
  animation: musicians-scroll 88s linear infinite;
  will-change: transform;
}

.musicians-row--reverse .musicians-track {
  animation-name: musicians-scroll-reverse;
  animation-duration: 96s;
}

.musicians-row:nth-child(1) .musicians-track {
  animation-delay: -12s;
}

.musicians-row:nth-child(2) .musicians-track {
  animation-delay: -31s;
}

.musicians-row:nth-child(3) .musicians-track {
  animation-delay: -43s;
}

.musicians-group {
  display: flex;
  flex: none;
  gap: clamp(14px, 2vw, 28px);
  padding-right: clamp(14px, 2vw, 28px);
}

.musician-avatar {
  flex: none;
  width: clamp(72px, 9vw, 116px);
  aspect-ratio: 1;
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  background: #1e1e1e;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.2);
}

.musician-avatar :deep(.lazy-img),
.musician-avatar :deep(.lazy-img-el) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.musician-avatar :deep(.lazy-img) {
  background: #1e1e1e;
}

.musicians-tagline {
  position: absolute;
  right: clamp(96px, 14vw, 220px);
  bottom: clamp(96px, 10vw, 150px);
  z-index: 2;
  text-align: right;
  white-space: nowrap;
  transform: rotate(-4deg);
  transform-origin: right bottom;
  color: transparent;
  font-size: clamp(0.5rem, 0.85vw, 0.85rem);
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.08em;
  background: linear-gradient(
    90deg,
    #ff5f6d,
    #ffc371,
    #fff06a,
    #72f1b8,
    #72c2ff,
    #a78bfa,
    #ff7ac6,
    #ff5f6d
  );
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
  animation: musicians-tagline-rainbow 4s linear infinite;
}

.musicians-tagline::after {
  position: absolute;
  inset: 0;
  z-index: -1;
  content: attr(data-text);
  color: transparent;
  font: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  background: linear-gradient(
    90deg,
    #ff5f6d,
    #ffc371,
    #fff06a,
    #72f1b8,
    #72c2ff,
    #a78bfa,
    #ff7ac6,
    #ff5f6d
  );
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: blur(8px);
  opacity: 0.9;
  pointer-events: none;
  animation: musicians-tagline-rainbow 4s linear infinite;
  animation-delay: -1.5s;
}

@keyframes musicians-tagline-rainbow {
  to {
    background-position: 300% 50%;
  }
}

@keyframes musicians-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes musicians-scroll-reverse {
  from {
    transform: translate3d(-50%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .musicians-track {
    animation-play-state: paused;
  }

  .musicians-tagline {
    animation-play-state: paused;
  }

  .musicians-tagline::after {
    animation-play-state: paused;
  }
}

@media (max-width: 768px) {
  .musicians-section {
    padding: 48px 0 80px;
  }

  .musicians-header {
    margin-bottom: 36px;
    padding: 0 24px;
    transform: rotate(-3deg);
  }

  .musicians-subtitle {
    font-size: 0.95rem;
  }

  .musicians-header h2 {
    font-size: 2.6rem;
  }

  .musicians-row {
    margin: 12px 0;
    padding: 7px 0;
    transform: rotate(-3deg) scale(1.08);
  }

  .musicians-track {
    animation-duration: 70s;
  }

  .musicians-row--reverse .musicians-track {
    animation-duration: 78s;
  }

  .musicians-group {
    gap: 14px;
    padding-right: 14px;
  }

  .musicians-tagline {
    right: 32px;
    bottom: 54px;
    font-size: 0.8rem;
  }
}
</style>
