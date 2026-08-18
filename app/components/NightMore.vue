<template>
  <section class="night-more" aria-labelledby="night-more-title">
    <div class="night-more__container">
      <div class="night-more__copy">
        <ScrollColorText
          as="h2"
          id="night-more-title"
          color1="#ebebeb34"
          color2="#e0e0e0"
        >
          {{ $t('night.moreTitle') }}
        </ScrollColorText>
        <ScrollColorText
          as="p"
          color1="#ebebeb34"
          color2="#b0b0b0"
        >
          {{ $t('night.moreSubtitle') }}
        </ScrollColorText>
      </div>

      <div class="night-more__links">
        <ClickTilt class="night-more__tilt">
          <a
            class="night-more__link"
            href="https://www.youtube.com/@lywings1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/link/youtube_w.svg" alt="" aria-hidden="true">
            <span>{{ $t('night.youtube') }}</span>
          </a>
        </ClickTilt>
        <ClickTilt class="night-more__tilt">
          <a
            class="night-more__link"
            href="https://space.bilibili.com/371768934"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/img/link/bili_w.svg" alt="" aria-hidden="true">
            <span>{{ $t('night.bilibili') }}</span>
          </a>
        </ClickTilt>
      </div>
    </div>
  </section>
</template>

<style scoped>
.night-more {
  position: relative;
  z-index: 1;
  padding: clamp(64px, 9vw, 128px) 0 clamp(120px, 16vw, 220px);
  background: transparent;
}

.night-more__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.night-more__copy {
  max-width: 800px;
  margin-bottom: 34px;
  text-align: left;
}

.night-more__copy h2 {
  margin: 0 0 10px;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.08;
  font-weight: 600;
}

.night-more__copy p {
  margin: 0;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.7;
}

.night-more__links {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: flex-start;
}

.night-more__tilt {
  display: inline-flex;
}

.night-more__link {
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  gap: 12px;
  padding: 12px 22px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: #e0e0e0;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease;
}

.night-more__link:hover {
  background: #e0e0e0;
  color: #121212;
}

.night-more__link:focus-visible {
  outline: 2px solid #72c2ff;
  outline-offset: 4px;
}

.night-more__link img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  transition: filter 0.25s ease;
}

.night-more__link:hover img {
  filter: invert(1);
}

@media (max-width: 768px) {
  .night-more {
    padding: 64px 0 120px;
  }

  .night-more__container {
    padding: 0 24px;
  }

  .night-more__copy {
    margin-bottom: 28px;
  }

  .night-more__copy h2 {
    font-size: 2.6rem;
  }

  .night-more__links {
    flex-direction: column;
    align-items: flex-start;
  }

  .night-more__tilt {
    width: min(100%, 320px);
  }

  .night-more__link {
    width: 100%;
  }
}
</style>
