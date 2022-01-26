// 1 建立Vue環境,使用ESM
// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.6/vue.esm-browser.min.js';
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

let productModal = '';
let delProductModal = '';
// 2 建立實體

const app = createApp({
    data() {
        return {
          apiUrl: 'https://vue3-course-api.hexschool.io/v2',
          apiPath: 'supergoldmanster',
          products: [],
          isNew: false,// 定義modal 視窗開啟關閉
          temp: {
            imagesUrl: [],// 定義 modal 圖片陣列
          },
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
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
        axios.get(url)
          .then((response) => {
            this.products = response.data.products;
          })
          .catch((err) => {
            alert(err.data.message);
          })
      },
      
    },
    // 新增 update
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
      createImages() {
        this.temp.imagesUrl = [];
        this.temp.imagesUrl.push('');
      },



    mounted() {
        // 開啟 modal
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
          keyboard: false
        });
    
        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
          keyboard: false
        });
    
        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
    
        this.checkAdmin();
      },
});
// 3 掛載
app.mount('#app');