import Vue from 'vue';
import {
    Menu, Submenu, MenuItem, Button, Input, Select, CheckboxGroup, Checkbox, Option, Form, FormItem, Dropdown, DropdownMenu, DropdownItem, Drawer, Tag, Table, Poptip,
    Spin, Modal, Alert, Message, Notice, LoadingBar, Icon, Steps, Step, Switch, RadioGroup, Radio, Row, Col, Layout, Header, Content, Footer, Upload, Slider, DatePicker,
    Carousel, CarouselItem
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
Vue.component('CheckboxGroup', CheckboxGroup);
Vue.component('Checkbox', Checkbox);
Vue.component('Select', Select);
Vue.component('Option', Option);
Vue.component('Form', Form);
Vue.component('FormItem', FormItem);
Vue.component('Submenu', Submenu);
Vue.component('MenuItem', MenuItem);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('DatePicker', DatePicker);
Vue.component('Spin', Spin);
Vue.component('Modal', Modal);
Vue.component('Alert', Alert);
Vue.component('Notice', Notice);
Vue.component('Steps', Steps);
Vue.component('Step', Step);
Vue.component('Table', Table);
Vue.component('SwitchTab', Switch);
Vue.component('RadioGroup', RadioGroup);
Vue.component('Radio', Radio);
Vue.component('Drawer', Drawer);
Vue.component('Poptip', Poptip);
Vue.component('Tag', Tag);
Vue.component('Upload', Upload);
Vue.component('Slider', Slider);

Vue.component('Carousel', Carousel);
Vue.component('CarouselItem', CarouselItem);
Vue.component('Icon', Icon);
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Message = Message;
Vue.prototype.$Message.config({ top: 70, duration: 3 });
Vue.prototype.$Loading = LoadingBar;