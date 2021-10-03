export const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/menu/Menu.vue"),
        children: [
            {
                path: "/usuarios",
                name: "Usuarios",
                component: () => import("../views/menu/usuario/Usuario.vue")
            }
        ]
    },
]