import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            // {
            //   name: '默认表格',
            //   icon: 'table',
            //   path: '/list',
            //   component: './ListTableList',
            // },
            // {
            //   name: '员工管理',
            //   icon: 'userSwitch',
            //   path: '/roster',
            //   component: './customer/roster',
            // },
            {
              name: '业务中心',
              icon: 'userSwitch',
              path: '/businessCenter',
              routes: [
                {
                  path: '/businessCenter/customerManage',
                  name: '客户管理',
                  icon: 'smile',
                  component: './businessCenter/customerManage',
                },
                {
                  path: '/businessCenter/projectManage',
                  name: '项目管理',
                  icon: 'smile',
                  component: './businessCenter/projectManage',
                },
                {
                  path: '/businessCenter/personnelManage',
                  name: '人员管理',
                  icon: 'smile',
                  component: './businessCenter/personnelManage',
                },
                {
                  path: '/businessCenter/commercialManage',
                  name: '商保管理',
                  icon: 'smile',
                  component: './businessCenter/commercialManage',
                },
                {
                  path: '/businessCenter/orderManage',
                  name: '订单管理',
                  icon: 'smile',
                  component: './businessCenter/orderManage',
                },
                {
                  path: '/businessCenter/receiveManage',
                  name: '接单管理',
                  icon: 'smile',
                  component: './businessCenter/receiveManage',
                },
                {
                  path: '/businessCenter/sceneManage',
                  name: '场景管理',
                  icon: 'smile',
                  component: './businessCenter/sceneManage',
                },
              ],
            },
            {
              name: '结算中心',
              icon: 'smile',
              path: '/settle-center',
              // component: './settleCenter',
              routes: [
                {
                  name: '客户账单',
                  icon: 'smile',
                  path: '/settle-center/customer-bill',
                  component: './settleCenter/customerBill',
                },
                {
                  name: '发票管理',
                  icon: 'smile',
                  path: '/settle-center/invoices-manage',
                  component: './settleCenter/invoicesManage',
                },
                {
                  name: '客户结算',
                  icon: 'smile',
                  path: '/settle-center/settle-accounts',
                  component: './settleCenter/settleAccounts',
                },
                {
                  name: '企业钱包',
                  icon: 'smile',
                  path: '/settle-center/wallet',
                  component: './settleCenter/wallet',
                },
                {
                  name: '纳税申报',
                  icon: 'smile',
                  path: '/settle-center/pay-taxes',
                  component: './settleCenter/payTaxes',
                },
                {
                  name: '支付个人',
                  icon: 'smile',
                  path: '/settle-center/payoff',
                  component: './settleCenter/payoff',
                },
                {
                  name: '银行账单',
                  icon: 'smile',
                  path: '/settle-center/bank-statement',
                  component: './settleCenter/bankStatement',
                },
              ],
            },
            {
              name: '系统中心',
              icon: 'userSwitch',
              path: '/sysCenter',
              routes: [
                {
                  path: '/sysCenter/userAccount',
                  name: '用户账号',
                  icon: 'smile',
                  component: './sysCenter/userAccount',
                },
                {
                  path: '/sysCenter/systemAccount',
                  name: '系统账号',
                  icon: 'smile',
                  component: './sysCenter/systemAccount',
                },
                {
                  path: '/sysCenter/systemRole',
                  name: '系统角色',
                  icon: 'smile',
                  component: './sysCenter/systemRole',
                },
                {
                  path: '/sysCenter/organizationalStructure',
                  name: '组织架构',
                  icon: 'smile',
                  component: './sysCenter/organizationalStructure',
                },
                {
                  path: '/sysCenter/optionConfig',
                  name: '选项配置',
                  icon: 'smile',
                  component: './sysCenter/optionConfig',
                },
                {
                  path: '/sysCenter/operateLog',
                  name: '操作日志',
                  icon: 'smile',
                  component: './sysCenter/operateLog',
                },
                {
                  path: '/sysCenter/systemNotice',
                  name: '系统通知',
                  icon: 'smile',
                  component: './sysCenter/systemNotice',
                },
                {
                  path: '/sysCenter/safeBackup',
                  name: '安全备份',
                  icon: 'smile',
                  component: './sysCenter/safeBackup',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
} as IConfig;
