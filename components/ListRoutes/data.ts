export const routes = [
    { id: 1, name: "route:statitic", path: "/revenue", icon: "/images/statistic.png" },
    {
        id: 2,
        name: "route:user",
        path: "/accounts",
        icon: "/images/teamwork.png",
    },
    {
        id: 3,
        name: "route:managephylogenetics",
        icon: "/images/phylogenetics.png",
        children: [
            {
                id: 4,
                name: "route:category",
                path: "/categories",
                icon: "/images/puppy.png",
            },
            {
                id: 5,
                name: "route:petsManagement",
                path: "/pets",
                icon: "/images/puppy.png",
            },
            {
                id: 6,
                name: "route:species",
                path: "/species",
                icon: "/images/earth.png",
            },
        ],
    },
    {
        id: 7,
        name: "route:managerService",
        icon: "/images/customer-service.png",
        children: [
            {
                id: 8,
                name: "route:service",
                path: "/services",
                icon: "/images/self-service.png",
            },
            {
                id: 9,
                name: "route:promotion",
                path: "/promotion",
                icon: "/images/tag.png",
            },
            {
                id: 10,
                name: "route:post",
                path: "/posts",
                icon: "/images/blog.png",
            },
        ],
    },
    {
        id: 11,
        name: "route:configuration",
        icon: "/images/configuration.png",
        children: [
            {
                id: 12,
                name: "route:vaccine",
                path: "/vaccine",
                icon: "/images/tag.png",
            },
            {
                id: 13,
                name: "route:contract",
                path: "/contracts",
                icon: "/images/signature.png",
            },
            {
                id: 14,
                name: "route:ticket",
                path: "/tickets",
                icon: "/images/messages.png",
            },
        ],
    },
];
