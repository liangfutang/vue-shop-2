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
  Header,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Radio,
  RadioButton,
  RadioGroup
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
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Submenu)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)

Vue.prototype.$message = Message
