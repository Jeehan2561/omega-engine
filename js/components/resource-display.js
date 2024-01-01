Vue.component("resource-display", {
    props: ["layer"],
    methods: {
        format: (decimal, precision) => format(decimal, precision)
    },
    template: `<p class="resource-display">You have <span>{{format(layer.resource, 3)}}</span> <resource-name :layerid="layer.layer"></resource-name></p>`
});