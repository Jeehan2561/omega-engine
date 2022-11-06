Vue.component("functions-locked-button", {
    props: ["functions"],
    methods: {
        totalFunctions: () => game.functionsLayer.functionsPoints,
        Decimal: (x) => new Decimal(x)
    },
    template: `<button @click="$emit('click')" :disabled="Decimal(totalFunctions()).lt(functions)">
    <span v-if="Decimal(totalFunctions()).lt(functions)">Reach {{functions}}<span class="aleph">ƒP</span></span>
    <span v-else><slot></slot></span>
</button>`
<<<<<<< HEAD
})
=======
})
>>>>>>> 213df0d5ad581f9042197c68cb381c7a42db1bc4
