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
  RadioGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option
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
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
