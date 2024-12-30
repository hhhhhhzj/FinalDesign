<template>

  <Nav />
  <div class="house-detail" v-if="houseForm && Object.keys(houseForm).length">
    <div class="content">
      <!-- 房源详情部分 -->
      <el-row class="title-container">
        <el-col :span="18" class="house-title">
          {{ houseForm.title || "暂无标题" }}
        </el-col>
        <el-col :span="6" class="id-container">
          <p>房源编号:{{ houseForm._id }}</p>
        </el-col>
      </el-row>
      <el-row class="content-container">
        <el-col :span="14" class="img-container">
          <el-carousel height="500px" indicator-position="outside" motion-blur>
            <el-carousel-item v-for="item in houseForm.houseImg" :key="item">
              <el-image style="width: 100%; height: 500px" :src="'http://localhost:3000' + item" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="10" class="info-container">
          <el-row class="price-info">
            <el-col :span="6" class="price">
              <p>{{ houseForm.price }}万</p>
            </el-col>
            <el-col :span="10" class="per-area">
              <p>{{ houseForm.perSquarePrice }}元/平方</p>
            </el-col>
            <el-col :span="4" class="button">
              <el-button type="primary" size="small">收藏</el-button>
            </el-col>
          </el-row>
          <el-divider />
          <el-row class="type-info">
            <el-col :span="8" class="type">
              <p>{{ houseForm.roomNum }}室{{ houseForm.hallNum }}厅{{ houseForm.toiletNum }}卫</p>
            </el-col>
            <el-col :span="8" class="area">
              <p>{{ houseForm.area }}平米</p>
            </el-col>
            <el-col :span="8" class="orientation">
              <p>{{ houseForm.orientation }}</p>
            </el-col>
          </el-row>
          <el-row class="type-info2">
            <el-col :span="8" class="floor">
              <p>{{ houseForm.floor }}层</p>
            </el-col>
            <el-col :span="8" class="decoration">
              <p>{{ houseForm.decoration }}</p>
            </el-col>
            <el-col :span="8" class="buildTime">
              <p>{{ formatYear(houseForm.buildTime) }}年竣工</p>
            </el-col>
          </el-row>
          <el-divider />
          <el-row class="address">
            <el-col>
              <p>所属区域:{{ houseForm.address }}</p>
            </el-col>
          </el-row>
          <el-row class="community">
            <el-col>
              <p>所属小区:{{ houseForm.community }}</p>
            </el-col>
          </el-row>
          <el-divider />

          <el-row class="contact">
            <el-col :span="4">
              <el-avatar :size="60"
                :src="'https://spic1.ajkimg.com/hQ1h3qgWrhpQLVDhHKZc2-MEfjvyUpAKW71QNjPJgfAyxHvkG1VR3pI3nonzisgdXhB7Oyj8kEgTJdcmmikfakbLbhIpdHJz-syaJRdQ4oKV21sLb5pGZGmKlr92wNRWszosox5TTbwqHFrexkn2iHRjpR8w2x2A2F_9NLUUdDEAqDvxLDp0L1R9rAvZ_2lK'" />
            </el-col>
            <el-col :span="8">
              <p>专业团队</p>
              <p>提供专业的服务</p>
            </el-col>
            <el-col :span="10">
              <img src="../../assets/WechatIMG59.jpg" style="width: 140px;">
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 相关房源 -->
      <div class="other-container">
        <el-row class="house-info">
          <el-col :span="14" style="padding-right: 30px">
            <h2>房源信息</h2>
            <p>发布时间:{{ moment(houseForm.createdAt).utcOffset(8).format('YYYY-MM-DD') }}</p>
            <p>物业类型:{{ houseForm.propertyType }}</p>
            <p>交通:{{ houseForm.subway }}</p>
            <p>卖家心态:</p>
            <p>{{ houseForm.ownerMood }}</p>
            <p>核心卖点:</p>
            <p>{{ houseForm.sellPoint }}</p>
          </el-col>
          <el-col :span="10">
            <h2>相关房源</h2>
            <div v-if="relatedHouses.length">
              <el-row>
                <el-col :span="24" v-for="house in relatedHouses" :key="house._id" @click="goToDetail(house._id)">
                  <div class="card" >
                    <el-image style="width: 150px; height: 150px" :src="'http://localhost:3000' + house.houseImg[0]" fit="cover" />
                    <div class="info">
                      <p>{{ house.title }}</p>
                      <p>{{ house.address }}</p>
                      <p>{{ house.community }}</p>
                    </div>
                    <div class="price-right">
                      <p>{{ house.price }}万</p>
                      <p>{{ house.perSquarePrice }}元/平方</p>

                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <p v-else>暂无相关房源</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
  <div class="not-found" v-else>
    <h1>房源不存在或未发布</h1>
    <p>请返回首页或联系管理员。</p>
    <el-button type="primary" @click="goBack">返回首页</el-button>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import moment from "moment";
import Nav from "@/components/web/Nav.vue";

const router = useRouter();
const route = useRoute();
const houseForm = reactive({});
const relatedHouses = ref([]);

const goBack = () => {
  window.location.href = "/";
};
const goToDetail = (_id) => {
  try {
    router.push(`/housedetail/${_id}`);
  } catch (error) {
    console.error("Error while navigating:", error);
  }
};

const formatYear = (date) => {
  if (!date) return "未知年份";
  const year = new Date(date).getFullYear();
  return year || "未知年份";
};

// 加载数据
// 过滤掉当前房源的逻辑
onMounted(async () => {
  await fetchData(route.params.id);
});

watch(
  () => route.params.id, // 监听路由参数的变化
  async (newId) => {
    await fetchData(newId); // 参数变化时重新加载数据
  }
);

const fetchData = async (id) => {
  // 获取当前房源信息
  const res = await axios.get(`/adminapi/webhouse/list/${id}`);
  Object.assign(houseForm, res.data.data[0]);

  // 获取相关房源
  if (houseForm.address) {
    const relatedRes = await axios.get(`/adminapi/webhouse/similar`, {
      params: { address: houseForm.address },
    });

    if (Array.isArray(relatedRes.data.data)) {
      relatedHouses.value = relatedRes.data.data.filter(
        (house) => String(house._id) !== String(houseForm._id)
      );
    } else {
      console.error("API data is not an array:", relatedRes.data.data);
    }
  }
};
</script>

<style scoped>
.house-detail {
  padding: 20px;
  display: flex;
  justify-content: center;

  .content {
    width: 75%;


    .title-container {
      height: 80px;

      .house-title {
        font-size: 36px;
        font-weight: bold;
      }

      .id-container {
        display: flex;
        align-items: center;
        justify-content: end;
        color: #ccc;
        font-size: .75em;
      }
    }

    .content-container {

      .info-container {
        padding-left: 20px;



        .price {
          color: red;
          font-size: 2.3em;
          font-weight: bolder;
        }

        .per-area {
          display: flex;
          align-items: center;
          padding: 10px;
          font-weight: bolder;
        }

        .type-info {
          padding-bottom: 10px;
          font-weight: bolder;
          font-size: 1.2em;
        }

        .type-info2 {
          margin-bottom: 20px;
        }

        .community,
        .address {
          height: 40px;
        }
      }
    }
  }

}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.contact {
  .el-col {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}

.other-container {
  .house-info {
    min-height: 400px;
    margin-top: 30px;

    p {
      margin-top: 10px;
      margin-left: 10px;
      color: gray;
    }
  }
}
.card {
  display: flex;
  padding: 10px;
  height: 160px;
  border: 1px solid #ccc;
  border-radius: 10px;
  .info{
    width: 50%;
  }
  p{
  }
}
</style>