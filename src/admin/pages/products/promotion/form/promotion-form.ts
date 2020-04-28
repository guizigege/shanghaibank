import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { ProductType } from '@/models/enums';
import Uploader from '@/components/uploader/uploader';
import ProductForm from '../../form/product-form';
import ProductsFormMixin from '../../products-form-mixins';

@Component({
  components: { ProductForm, Uploader }
})
class PromotionForm extends mixins(ProductsFormMixin) {

  productType: ProductType = ProductType.活动;
}

export default PromotionForm;
