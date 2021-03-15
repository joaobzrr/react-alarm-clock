import make from "@bzrr/useclasses";
const { useClasses, serializeClasses } = make([
    {
        name: "button",
        group: "default"
    },
    {
        name: "HoldableButton",
        group: "default"
    },
    {
        name: "HoldableButton__pressed",
        group: 1
    },
    {
        name: "HoldableButton__released",
        group: 1
    },
    {
        name: "HoldableButton__off",
        group: 1
    }
]);

export { useClasses, serializeClasses };
