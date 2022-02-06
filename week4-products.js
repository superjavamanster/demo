// 1 建立Vue環境,使用ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from './pagination.js';  // pagination 區域元件匯入
let productModal = null;
let delProductModal = null;
// 2 建立實體
const app = createApp({
  // pagination 區域元件註冊
  components: {
    pagination
  },
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'supergoldmanster',
      products: [],
      isNew: false, // 定義modal 視窗開啟關閉
      temp: {
        imagesUrl: [], // 定義modal 視窗開啟關閉
      },
      pagination: {},
    }
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    }); //定義modal bootsrap 用js打開

    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    }); //定義modal bootsrap 用js打開

    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
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
          window.location = 'login.html';
        })
    },
    //渲染 (作業看到8:21分)
    getData(page = 1) { //page 預設值設定為1,如果沒有設定則會出現undefine
      // 定義getData API路徑選多頁
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;

      axios.get(url)
        .then((response) => {
          const { products, pagination } = response.data;
          this.products = products;
          this.pagination = pagination;
        }).catch((err) => {
          alert(err.data.message);
          window.location = 'index.html';
        })
    },
    //編輯
    updateProduct() {
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;
        http = 'put'
      }

      axios[http](url, { data: this.temp }).then((response) => {
        alert(response.data.message);
        productModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.data.message);
      })
    },
    //打開modal
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.temp = {
          imagesUrl: [],
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.temp = { ...item };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.temp = { ...item };
        delProductModal.show()
      }
    },
    // 刪除產品
    delProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;

      axios.delete(url).then((response) => {
        alert(response.data.message);
        delProductModal.hide();
        this.getData();
      }).catch((err) => {
        alert(err.data.message);
      })
    },
    //建立新產品
    createImages() {
      this.temp.imagesUrl = [];
      this.temp.imagesUrl.push('');
    },
  },
});
// 3 掛載
app.mount('#app');