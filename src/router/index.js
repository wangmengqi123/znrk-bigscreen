import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: () => import("@/views/bigscreen/index"),
    hidden: true,
  },

  {
    path: "/home",
    component: Layout,
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "route.home", icon: "el-icon-s-home" },
      },
    ],
  },

  {
    path: "/favorites",
    component: Layout,
    redirect: "/favorites/index",
    children: [
      {
        path: "index",
        name: "Favorites",
        component: () => import("@/views/favorites/index"),
        meta: { title: "route.favorites", icon: "el-icon-star-off" },
      },
    ],
  },

  {
    path: "/cockpit",
    component: Layout,
    redirect: "/cockpit/index",
    children: [
      {
        path: "index",
        name: "Cockpit",
        component: () => import("@/views/cockpit/index"),
        meta: { title: "route.cockpit", icon: "el-icon-monitor" },
      },
    ],
  },

  {
    path: "/analysis",
    component: Layout,
    redirect: "/analysis/index",
    name: "Analysis",
    meta: { title: "route.analysis", icon: "el-icon-data-line" },
    children: [
      {
        path: "curve",
        name: "Analysis",
        component: () => import("@/views/analysis/index"),
        meta: { title: "route.analysis", icon: "el-icon-data-analysis" },
      },
    ],
  },

  {
    path: "/monitoring",
    component: Layout,
    redirect: "/monitoring/index",
    name: "Monitoring",
    meta: { title: "route.monitoring", icon: "el-icon-data-analysis" },
    children: [
      {
        path: "curve",
        name: "RealTimeCurve",
        component: () => import("@/views/monitoring/curve/index"),
        meta: { title: "route.realTimeCurve", icon: "el-icon-data-analysis" },
      },
      {
        path: "device",
        name: "DeviceMonitoring",
        component: () => import("@/views/monitoring/device/index"),
        meta: { title: "route.deviceMonitoring", icon: "el-icon-cpu" },
      },
      {
        path: "stats",
        name: "OperationStats",
        component: () => import("@/views/monitoring/stats/index"),
        meta: { title: "route.operationStats", icon: "el-icon-s-data" },
      },
      {
        path: "battery",
        name: "BatteryData",
        component: () => import("@/views/monitoring/battery/index"),
        meta: { title: "route.batteryData", icon: "el-icon-news" },
      },
      {
        path: "soc",
        name: "SocCurve",
        component: () => import("@/views/monitoring/soc/index"),
        meta: { title: "route.socCurve", icon: "el-icon-s-marketing" },
      },
      {
        path: "self-consumption",
        name: "SelfConsumption",
        component: () => import("@/views/monitoring/self-consumption/index"),
        meta: { title: "route.selfConsumption", icon: "el-icon-odometer" },
      },
      // {
      //   path: "network",
      //   name: "NetworkMonitoring",
      //   component: () => import("@/views/monitoring/network/index"),
      //   meta: { title: "全网监控", icon: "el-icon-s-platform" },
      // },
    ],
  },

  {
    path: "/report",
    component: Layout,
    redirect: "/report/meter-reading", // 默认跳转到第一个子菜单
    name: "Report",
    meta: { title: "route.report", icon: "el-icon-document" },
    children: [
      {
        path: "meter-reading",
        name: "MeterReading",
        component: () => import("@/views/report/meter-reading/index"),
        meta: { title: "route.meterReading", icon: "el-icon-time" }, // 使用类似的图标
      },
      {
        path: "reconciliation",
        name: "Reconciliation",
        component: () => import("@/views/report/reconciliation/index"),
        meta: { title: "route.reconciliation", icon: "el-icon-tickets" },
      },
      {
        path: "daily-stats",
        name: "DailyStats",
        component: () => import("@/views/report/daily-stats/index"),
        meta: { title: "route.dailyStats", icon: "el-icon-data-analysis" },
      },
      {
        path: "daily-summary",
        name: "DailySummary",
        component: () => import("@/views/report/daily-summary/index"),
        meta: { title: "route.dailySummary", icon: "el-icon-collection" },
      },
      {
        path: "period-meter",
        name: "PeriodMeter",
        component: () => import("@/views/report/period-meter/index"),
        meta: { title: "route.periodMeter", icon: "el-icon-date" },
      },
      {
        path: "price",
        name: "ProjectPrice",
        component: () => import("@/views/report/price/index"),
        meta: { title: "route.projectPrice", icon: "el-icon-money" },
      },
      {
        path: "operation",
        name: "OperationRecords",
        component: () => import("@/views/report/operation/index"),
        meta: { title: "route.operationRecords", icon: "el-icon-search" },
      },
      {
        path: "work-order",
        name: "WorkOrder",
        component: () => import("@/views/report/work-order/index"),
        meta: { title: "route.workOrder", icon: "el-icon-document-copy" },
      },
    ],
  },

  {
    path: "/strategy",
    component: Layout,
    redirect: "/strategy/index",
    name: "Strategy",
    meta: { title: "route.strategy", icon: "el-icon-setting" },
    children: [
      {
        path: "index",
        name: "StrategyManagement",
        component: () => import("@/views/strategy/index"),
        meta: { title: "route.strategyManagement" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
