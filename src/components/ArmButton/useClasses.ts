import make from "@bzrr/useclasses";
const { useClasses, serializeClasses } = make([
    {
        name: "ArmButton",
        group: "default"
    },
    {
        name: "ArmButton__isArmed",
        group: null
    }
]);

export { useClasses, serializeClasses };
