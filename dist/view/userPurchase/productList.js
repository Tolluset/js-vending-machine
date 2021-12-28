import View from '../abstract.js';
import el, { getIndex } from '../../util/dom.js';
import ProductItems from './productItems.js';
export default class ProductList extends View {
    static #template = /* html */ `
    <fragment>
      <h3>구매할 수 있는 상품 현황</h3>
      <table class="product-inventory margin-auto">
        <colgroup>
          <col style="width: 140px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
        </colgroup>
        <thead><tr><th>상품명</th><th>가격</th><th>수량</th><th>구매</th></tr></thead>
        <tbody id="product-items-container"></tbody>
      </table>
    </fragment>
  `;
    watchState = ['inventory'];
    $itemsContainer;
    #itemList = new ProductItems();
    constructor() {
        super();
        const $content = el(ProductList.#template);
        this.$itemsContainer = $content.querySelector('#product-items-container');
        this.handlers = [['click', this.onPurchase]];
        this.render($content);
    }
    onStoreUpdated({ inventory }) {
        const res = this.#itemList.update(inventory);
        el(this.$itemsContainer, res);
    }
    onPurchase = (e) => {
        e.preventDefault();
        const $tg = e.target;
        if ($tg.closest('tbody')?.id !== 'product-items-container' || $tg.localName !== 'button')
            return;
        const itemIndex = getIndex($tg.closest('tr'));
        this.dispatch("user_buyItem" /* user_buyItem */, itemIndex);
    };
}
customElements.define('product-list', ProductList);
//# sourceMappingURL=productList.js.map