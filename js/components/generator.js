Vue.component("generator",{
    props: ["generator"],
    computed: {
        canAfford: function()
        {
            return this.generator.currentPrice().lte(this.generator.layer.resource);
        },
        canAfford10: function()
        {
            return this.generator.getPriceUntil10().lte(this.generator.layer.resource);
        }
    },
    methods: {
        format: (decimal, precision) => format(decimal, precision)
    },
    template: `<tr>
<td>Generator <layer-colored-text :layerid="generator.layer.layer" v-html="generator.name"></layer-colored-text> <span style="font-size: 70%;">x {{format(generator.getProductionMulti(), 3)}}</span></td>
<td>{{format(generator.amount, 3)}} ({{format(generator.bought, 3)}})</td>
<td><button :disabled="!canAfford" @click="generator.buy()">{{format(generator.currentPrice(), 3)}} <resource-name :layerid="generator.layer.layer"></resource-name></button></td>
<td><button :disabled="!canAfford10" @click="generator.buyUntil10()">{{format(generator.getPriceUntil10(), 3)}} <resource-name :layerid="generator.layer.layer"></resource-name></button></td>
</tr>`
});