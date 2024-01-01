Vue.component("layer-statistics", {
    props: ["layer"],
    methods: {
        format: (decimal, precision) => format(decimal, precision),
        formatTimePlus: (decimal, precision) => formatTimePlus(decimal, precision),
        formatTime: s => functions.formatTime(s),
        formatTimesReset: function(t)
        {
            return t.toLocaleString("en-us", {minimumFractionDigits: 0, maximumFractionDigits: 0});
        }
    },
    template: `<div class="layer-statistics">
<p>You have {{format(layer.resource, 3)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>You have made a total of {{format(layer.totalResource, 3)}} resource on <resource-name :layerid="layer.layer"></resource-name></p>
<p>The highest you ever had is {{format(layer.maxResource, 3)}} <resource-name :layerid="layer.layer"></resource-name></p>
<p>You spent {{formatTimePlus(layer.timeSpent)}} this <resource-name :layerid="layer.layer"></resource-name></p>
<p v-if="layer.layer > 0">You have gone <resource-name :layerid="layer.layer"></resource-name> {{format(layer.timesReset)}} times</p>
<p v-if="layer.layer > 0 && layer.hasPower()">You have {{format(layer.power, 3)}} <resource-name :layerid="layer.layer"></resource-name>-Power</p>
</div>`
});