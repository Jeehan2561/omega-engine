Vue.component("aleph-layer", {
    data: function()
    {
        return {
            aleph: game.alephLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return this.aleph.getAlephBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.aleph.aleph.gt(1e300);
        }
    },
    methods: {
        format: (decimal, precision) => format(decimal, precision),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="aleph-layer">
<div class="resource">
    <p>You have {{format(aleph.aleph, 3)}} <span class="aleph">ℵ</span></p>
    <p>You get {{format(aleph.getAlephGain(), 3)}} <span class="aleph">ℵ</span> every second</p>
    <p>Which Translates to a {{format(aleph.getAlephBoost())}}x boost to Layer 1 Generators (based on layers)</p>
</div>
<div class="boosts">
    <div v-if="canProduceAleph">
        <p>Your highest Layer is <resource-name :layerid="highestLayer()"></resource-name>, translated to a x{{format(aleph.getAlephBoostFromLayer(), 3)}} Boost on <span class="aleph">ℵ</span> gain</p>
    </div>
    <div v-else>
        <p>You need to go <resource-name :layerid="3"></resource-name> at least once to get <span class="aleph">ℵ</span></p>
    </div>
</div>
<div class="tabs">
    <button @click="aleph.maxAll()">Max All (M)</button>
</div>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.alephGain"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephEffect"></aleph-upgrade>
</div>
<h3>Enhancers</h3>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.deltaBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.powerGenerators"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.prestigeNoPowerBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.betterBetaFormula"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephBoost2"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.prestigeRewards"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.layerExponentialBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.GeneratorBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.Timespeed"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.Dilation"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.BiggerSoftcap"></aleph-upgrade>
</div>
</div>`
});