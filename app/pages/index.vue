<script setup>
useHead({ title: 'CSBC华南马聚2026 - 主页' })

const teamMembers = [
  { name: '光翼', avatar: '/img/team/光翼.webp', roleKey: 'guangyi' },
  { name: 'Ladetaw', avatar: '/img/team/Ladetaw.webp', roleKey: 'ladetaw' },
  { name: 'Stevenife', avatar: '/img/team/Stevenife.webp', roleKey: 'stevenife' },
  { name: '牛奶', avatar: '/img/team/牛奶.webp', roleKey: 'niunai' },
  { name: '灵翼', avatar: '/img/team/灵翼.webp', roleKey: 'lingyi' },
]
</script>

<template>
  <div class="home">
    <AppHero />
    <AppFeatures />

    <!-- About -->
    <section class="about-section" id="about">
      <div class="container">
        <SectionTitle :title="$t('sections.about')" />
        <AppAbout />
      </div>
    </section>

    <!-- Venue -->
    <section class="venue-section" id="venue">
      <div class="container">
        <SectionTitle :title="$t('sections.venue')" />
        <AppVenue />
      </div>
    </section>

    <!-- Team -->
    <section class="team-section" id="team">
      <div class="container">
        <SectionTitle :title="$t('sections.team')" />
        <div class="team-content">
          <TeamMember
            v-for="member in teamMembers"
            :key="member.name"
            :name="member.name"
            :avatar="member.avatar"
            :description="$t('team.' + member.roleKey)"
          />
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="qa-section" id="qa">
      <div class="container">
        <SectionTitle :title="$t('sections.faq')" />
        <div class="qa-content">
          <div class="qa-column">
            <FAQItem
              :question="$t('faq.0.q')"
              :answer="$t('faq.0.a')"
            />
            <FAQItem
              :question="$t('faq.1.q')"
              :answer="$t('faq.1.a')"
            />
            <FAQItem
              :question="$t('faq.2.q')"
              :answer="$t('faq.2.a')"
            />
          </div>
          <div class="qa-column">
            <FAQItem
              :question="$t('faq.3.q')"
              :answer="$t('faq.3.a')"
            />
            <FAQItem
              :question="$t('faq.4.q')"
              :answer="$t('faq.4.a')"
            />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* ===== Container ===== */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* ===== About ===== */
.about-section {
  padding: 100px 0;
}

/* ===== Venue ===== */
.venue-section {
  padding: 100px 0;
}

/* ===== Team ===== */
.team-section {
  padding: 100px 0;
  background: white;
}
.team-content {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

/* ===== FAQ ===== */
.qa-section {
  padding: 100px 0;
  background: white;
}
.qa-content {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}
.qa-column {
  flex: 1;
  max-width: 48%;
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .qa-content {
    flex-direction: column;
  }
  .qa-column {
    max-width: 100%;
  }
}
</style>
