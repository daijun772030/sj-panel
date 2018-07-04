export default [
    {
      id: "0",
      name: "首页",
      path: "home",
      icon: "home",
      children: []
    },
    {
      id: "0",
      name: "商家管理",
      path: "busineManage",
      icon: "resource",
      children: [
        {
          id: 1,
          name: "商家列表",
          path: "busine-list",
          icon: "resource",
          children: []
        },
        {
          id: 2,
          name: "商家订单",
          path: "busine-order",
          icon: "resource",
          children: []
        }
      ]
    }
  ];
  