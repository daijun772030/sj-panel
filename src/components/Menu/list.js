export default [{
        id: "0",
        name: "订单管理",
        path: "order",
        icon: "order",
        children: [{
                id: 1,
                name: "待接订单",
                path: "index",
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
                path: "make",
                icon: "resource"
            }
            // {
            //     id: 4,
            //     name: "待评价",
            //     path: "evaluate",
            //     icon: "resource"
            // },
            // {
            //     id: 5,
            //     name: "完成订单",
            //     path: "accomplish",
            //     icon: "resource"
            // }
        ]
    },
    {
        id: "1",
        name: "财务管理",
        path: "business",
        icon: "resource",
        children: [{
                id: 1,
                name: "商家财务详情",
                path: "list",
                icon: "resource",
                children: []
            },
            {
                id: 2,
                name: "其它",
                path: "order",
                icon: "resource",
                children: []
            },

        ]
    },
    {
        id: '2',
        name: '商品管理',
        path: 'goods',
        icon: "resource",
        children: []
    },
    {
        id: "3",
        name: "活动管理",
        path: "activity",
        icon: "resource",
        children: []
    },
    {
        id: "4",
        name: "推广",
        path: "generalize",
        icon: "resource",
        children: []
    }

];