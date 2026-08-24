<template>
  <section class="transportation-section">
    <div class="container">
      <h2>{{ $t('navPage.transportation') }}</h2>

      <div class="transportation-intro">
        <p>{{ $t('navPage.intro') }}</p>
      </div>

      <div class="nav-images">
        <div class="nav-image-item">
          <ImgLazy src="/img/navigation/switzerland.jpg" :alt="$t('navPage.hotel')" class="nav-img" />
        </div>
        <div class="nav-image-item">
          <ImgLazy src="/img/navigation/transport.jpg" :alt="$t('navPage.transportation')" class="nav-img" />
        </div>
      </div>

      <div class="transportation-content">
        <div class="transportation-item">
          <div class="transportation-info">
            <h3>{{ $t('navPage.arrival.baiyun') }}</h3>
            <hr class="transportation-divider">
            <h4>{{ $t('navPage.arrival.t2') }}</h4>
            <ul>
              <li>{{ $t('navPage.routes.baiyunT2_a') }}</li>
              <li>{{ $t('navPage.routes.baiyunT2_b') }}</li>
              <li>{{ $t('navPage.routes.baiyunT2_c') }}</li>
              <li>{{ $t('navPage.routes.baiyunT2_d') }}</li>
            </ul>
            <h4>{{ $t('navPage.arrival.t3') }}</h4>
            <ul>
              <li>{{ $t('navPage.routes.baiyunT3_a') }}</li>
              <li>{{ $t('navPage.routes.baiyunT3_b') }}</li>
              <li>{{ $t('navPage.routes.baiyunT3_c') }}</li>
              <li>{{ $t('navPage.routes.baiyunT3_d') }}</li>
              <li>{{ $t('navPage.routes.baiyunT3_e') }}</li>
              <li>{{ $t('navPage.routes.baiyunT3_f') }}</li>
            </ul>
          </div>
        </div>

        <div class="transportation-item">
          <div class="transportation-info">
            <h3>{{ $t('navPage.arrival.guangzhouStation') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.gzStation_a') }}</li>
            </ul>
            <h3>{{ $t('navPage.arrival.eastStation') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.eastStation_a') }}</li>
            </ul>
            <h3>{{ $t('navPage.arrival.southStation') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.southStation_a') }}</li>
              <li>{{ $t('navPage.routes.southStation_b') }}</li>
            </ul>
            <h3>{{ $t('navPage.arrival.baiyunStation') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.baiyunStation_a') }}</li>
            </ul>
          </div>
        </div>

        <div class="transportation-item">
          <div class="transportation-info">
            <h3>{{ $t('navPage.arrival.northStation') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.northStation_a') }}</li>
            </ul>
            <ul>
              <li>{{ $t('navPage.routes.northStation_b') }}</li>
              <li>{{ $t('navPage.routes.northStation_c') }}</li>
              <li>{{ $t('navPage.routes.northStation_d') }}</li>
            </ul>
            <h3>{{ $t('navPage.arrival.xintang') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.xintang_a') }}</li>
            </ul>
            <ul>
              <li>{{ $t('navPage.routes.xintang_b') }}</li>
            </ul>
            <h3>{{ $t('navPage.arrival.nansha') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.nansha_a') }}</li>
            </ul>
            <h3>{{ $t('navPage.arrival.pazhou') }}</h3>
            <hr class="transportation-divider">
            <ul>
              <li>{{ $t('navPage.routes.pazhou_a') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transportation-section {
  padding: 80px 0;
}
.transportation-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.transportation-intro {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 900px;
  margin: 0 auto 30px;
  text-align: center;
}
.nav-images {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin: 30px 0;
}
.nav-image-item {
  flex: 1;
  max-width: 100%;
}
.nav-image-item :deep(.lazy-img) {
  width: 100%;
  border-radius: 15px;
  display: block;
}
.nav-image-item :deep(.lazy-img-el) {
  border-radius: 15px;
}
.transportation-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}
.transportation-item {
  padding: 30px;
}
.transportation-info h3 {
  font-size: 1.4rem;
  color: #3d3d3d;
  margin-bottom: 15px;
  font-weight: 600;
}
.transportation-divider {
  border: none;
  height: 1px;
  background: #d8d8d8;
  margin: 10px 0 20px 0;
  width: 150px;
}
.transportation-info h4 {
  font-size: 1.1rem;
  color: #696969;
  margin-bottom: 15px;
  font-weight: 600;
}
.transportation-info p {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin-bottom: 20px;
}
.transportation-info ul {
  list-style: none;
  padding: 0;
  margin: 0 0 25px;
}
.transportation-info li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #555;
}
.transportation-info li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4fa7ff;
  font-weight: bold;
}

@media (max-width: 768px) {
  .transportation-section h2 {
    font-size: 2rem;
  }
  .transportation-intro {
    font-size: 1rem;
  }
  .transportation-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .transportation-item {
    padding: 20px;
  }
  .nav-images {
    flex-direction: column;
    gap: 15px;
  }
}
</style>
