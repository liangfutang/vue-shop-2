import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Message
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.component(Message.name, Message)

Vue.prototype.$message = Message
