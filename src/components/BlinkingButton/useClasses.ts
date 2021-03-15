import make from "@bzrr/useclasses";

const { useClasses, serializeClasses } = make([
    {
        name: "button",
        group: "default"
    },
    {
        name: "BlinkingButton",
        group: "default"
    },
    {
        name: "BlinkingButton__isLit",
        group: null
    }
]);

export { useClasses, serializeClasses };
