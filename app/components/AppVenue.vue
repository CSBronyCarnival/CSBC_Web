<template>
  <div class="venue-content">
    <div class="venue-image">
      <ImgLazy src="/img/venue/main.webp" alt="广州瑞士酒店" class="venue-img" />
    </div>
    <div class="venue-description">
      <h3>广州瑞士酒店 <span>Swissôtel Guangzhou</span></h3>
      <div class="title-underline"></div>
      <h4>地址：广州市天河区华观路1961号</h4>
      <p>
        广州瑞士酒店位于广州市天河区东北部天河智慧城（IBD）的核心区--天河软件园内。
        酒店共拥有364间具有现代东方格调的客房及套房。
        酒店拥有3个风格各异的餐厅为宾客带来多元化的美食体验。此外，酒店还配有户外泳池，
        功能齐全、设施完备的健身中心，15000平方米的户外花园为宾客打造活力惬意的度假时光。
        时间与旅行是生活的美妙馈赠，希望入住的您也能感受到来自瑞士的健康活力与高品质生活体验。
      </p>
      <BaseButton to="/navigation" variant="section">了解详情/订购房间</BaseButton>
    </div>
  </div>
</template>

<style scoped>
.venue-content {
  display: flex;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  margin: 0 auto;
}
.venue-image {
  flex: 1;
  max-width: 500px;
}
.venue-image :deep(.lazy-img),
.venue-image :deep(.lazy-img-el) {
  width: 100%;
  border-radius: 10px;
}
.venue-description {
  flex: 1;
}
.venue-description h3 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #2c3e50;
}
.venue-description h3 span {
  font-size: 0.8rem;
  color: #7f8c8d;
  font-weight: 400;
  font-style: italic;
}
.venue-description h4 {
  font-size: 1rem;
  margin-bottom: 10px;
  color: #696969;
  font-weight: 400;
}
.venue-description p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}
.title-underline {
  width: 180px;
  height: 1px;
  background: #dfdfdf;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .venue-content {
    flex-direction: column;
    gap: 30px;
  }
  .venue-image {
    max-width: 100%;
    order: -1;
  }
}
</style>
