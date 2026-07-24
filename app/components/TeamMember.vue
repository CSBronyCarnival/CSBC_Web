<template>
  <div class="team-member">
    <div class="member-avatar"><img :src="avatar" :alt="name"></div>
    <h3>{{ name }}</h3>
    <p class="member-description">{{ description }}</p>
  </div>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  description: { type: String, default: '' }
})
</script>

<style scoped>
.team-member {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  flex: 1;
  min-width: 200px;
  max-width: 220px;
}
.member-avatar {
  width: 120px; height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
}
.member-avatar img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.team-member h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #2c3e50;
}
.member-description {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #555;
}

@media (max-width: 768px) {
  .team-member {
    min-width: 180px;
    max-width: 200px;
  }
  .member-avatar {
    width: 100px;
    height: 100px;
  }
}
</style>
