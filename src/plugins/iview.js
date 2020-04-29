import Vue from 'vue';
import { Menu, Submenu, MenuItem, Button, Input, Form, Dropdown, DropdownMenu, DropdownItem, Spin, Modal, Alert, Message, LoadingBar, Icon } from 'iview';
Vue.component('Menu', Menu);
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.component('Form', Form);
Vue.component('Submenu', Submenu);
Vue.component('MenuItem', MenuItem);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Spin', Spin);
Vue.component('Modal', Modal);
Vue.component('Alert', Alert);


Vue.component('Icon', Icon);
Vue.prototype.$Message = Message;
Vue.prototype.$Message.config({ top: 70, duration: 3 });
Vue.prototype.$Loading = LoadingBar;