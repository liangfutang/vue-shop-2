import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Main,
  Aside,
  Container,
  Header
} from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.component(Message.name, Message)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Header)

Vue.prototype.$message = Message
