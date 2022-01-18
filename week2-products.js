// 1 建立Vue環境,使用ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.6/vue.esm-browser.min.js';
// 2 建立實體

const app = createApp({
    data(){
        return {
          apiUrl: 'https://vue3-course-api.hexschool.io/v2',
          apiPath: 'supergoldmanster',
          products: [],
          temp: {},
        }
    },
    methods: {
      checkAdmin() {
        const url = `${this.apiUrl}/api/user/check`;
        axios.post(url)
          .then(() => {
            this.getData();
          })
          .catch((err) => {
            alert(err.data.message)
            window.location = 'index.html';
          })
      },
      getData() {
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
        axios.get(url)
          .then((response) => {
            this.products = response.data.products;
          })
          .catch((err) => {
            alert(err.data.message);
          })
      },
      openProduct(item) {
        this.temp = item;
      }
    },
    mounted() {
      // 取出 Token
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.defaults.headers.common.Authorization = token;
  
      this.checkAdmin()
    }
});
// 3 掛載
app.mount('#app');
