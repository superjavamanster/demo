// 1 建立Vue環境,使用ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.6/vue.esm-browser.min.js';
// 2 建立實體

const app = createApp({
    data() {
      return {
        user: {
          username: '',
          password: '',
        },
      }
    },
    methods: {
      login() {
        const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
        axios.post(api, this.user).then((response) => {
          // 確認API 連接是否ok 使用 console.log();
          const { token, expired } = response.data;
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
          window.location = 'week4-products.html';
        }).catch((error) => {
          alert(error.data.message);
        });
      },
    },
      
});
// 3 掛載
app.mount('#app');
