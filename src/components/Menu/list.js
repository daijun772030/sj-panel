export default [{
        id: "0",
        name: "订单管理",
        path: "/manager/order",
        icon: "order",
        children: [{
                id: 1,
                name: "待接订单",
                path: "/manager/index",
                icon: "resource"
            },
            // {
            //     id: 2,
            //     name: "待收货",
            //     path: "send",
            //     icon: "resource"
            // },
            {
                id: 3,
                name: "待发货",
                path: "/manager/make",
                icon: "resource"
            },
            // {
            //     id: 4,
            //     name: "待评价",
            //     path: "evaluate",
            //     icon: "resource"
            // },
            {
                id: 4,
                name: "完成订单",
                path: "/manager/accomplish",
                icon: "resource"
            }
        ]
    },
    {
        id: "1",
        name: "财务管理",
        path: "/manager/business",
        icon: "resource",
        children: [{
                id: 1,
                name: "商家财务详情",
                path: "/manager/list",
                icon: "resource",
                children: []
            },
            {
                id: 2,
                name: "其它",
                path: "/manager/business-order",
                icon: "resource",
                children: []
            },

        ]
    },
    {
        id: '2',
        name: '商品管理',
        path: '/manager/goods',
        icon: "resource",
        children: []
    },
    {
        id: "3",
        name: "活动管理",
        path: "/manager/activity",
        icon: "resource",
        children: []
    },
    {
        id: "4",
        name: "推广",
        path: "/manager/generalize",
        icon: "resource",
        children: []
    }

];