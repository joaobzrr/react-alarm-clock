import make from "@bzrr/useclasses";
const { useClasses, serializeClasses } = make([
    {
        name: "Controls",
        group: "default"
    },
    {
        name: "Controls__isNotIdle",
        group: null
    }
]);

export { useClasses, serializeClasses };
