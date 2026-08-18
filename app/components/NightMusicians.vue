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
      v-for="row in rows"
      :key="row"
      class="musicians-row"
      :class="{ 'musicians-row--reverse': row % 2 === 1 }"
    >
      <div class="musicians-track">
        <div class="musicians-group">
          <figure
            v-for="musician in musicians"
            :key="`${row}-${musician.name}`"
            class="musician-avatar"
          >
            <img
              :src="musician.src"
              :alt="musician.name"
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
        <div class="musicians-group" aria-hidden="true">
          <figure
            v-for="musician in musicians"
            :key="`${row}-duplicate-${musician.name}`"
            class="musician-avatar"
          >
            <img
              :src="musician.src"
              alt=""
              loading="eager"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [0, 1, 2]

const musicianNames = [
  'aeotyr',
  'C.R. Infinity Limit',
  'Camelia',
  'Choefeker',
  'Colorglint',
  'Everydaydashie',
  'GrieferPig',
  'Ladetaw',
  'Nightlight',
  'noshrimp',
  'Rainko',
  'Rinne',
  'Silvery SKY',
  'Starry Xplosion',
  'White',
  '旭日',
  '桃风',
  '海冰',
  '翊帆',
  '韵华',
]

const musicians = musicianNames.map((name) => ({
  name,
  src: `/img/night/musician/${name}.webp`,
}))
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
  border: 1px solid rgba(235, 235, 235, 0.2);
  border-radius: 8px;
  background: #1e1e1e;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.2);
}

.musician-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
}
</style>
