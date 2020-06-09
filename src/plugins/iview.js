import Vue from 'vue';
import {
    Menu, Submenu, MenuItem, Button, Input, Form, FormItem, Dropdown, DropdownMenu, DropdownItem, Drawer, Tag, Table,
    Spin, Modal, Alert, Message, Notice, LoadingBar, Icon, Steps, Step, Switch, Row, Col, Layout, Header, Content, Footer
} from 'iview';
Vue.component('Layout', Layout);
Vue.component('Header', Header);
Vue.component('Content', Content);
Vue.component('Footer', Footer);
Vue.component('Row', Row);
Vue.component('ICol', Col);
Vue.component('Menu', Menu);
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Submenu', Submenu);
Vue.component('MenuItem', MenuItem);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Spin', Spin);
Vue.component('Modal', Modal);
Vue.component('Alert', Alert);
Vue.component('Notice', Notice);
Vue.component('Steps', Steps);
Vue.component('Step', Step);
Vue.component('Table', Table);
Vue.component('SwitchTab', Switch);
Vue.component('Drawer', Drawer);
Vue.component('Tag', Tag);

Vue.component('Icon', Icon);
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Message = Message;
Vue.prototype.$Message.config({ top: 70, duration: 3 });
Vue.prototype.$Loading = LoadingBar;