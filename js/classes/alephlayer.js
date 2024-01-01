class AlephLayer
{
    constructor()
    {
        this.aleph = new Decimal(0);
        this.upgrades = {
            alephGain: new AlephUpgrade("Increase your aleph gain", level => Decimal.pow(1.25, level).mul(10),
                level => Decimal.pow(1.2 + game.restackLayer.permUpgrades.aleph.apply(), level)),
            alephEffect: new AlephUpgrade("Triple Aleph Gain and Raise Aleph Boost by 1.125th per level",
                level => Utils.createValueDilation(Decimal.pow(1000, level.add(1).pow(1.25)), 0.02),
                level => D(1.125).pow(level), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^", 0)
                }),
            alephBoost: new AlephUpgrade("Gain more aleph based on the log(ℵ) you have",
                level => new Decimal(1e6).pow(Decimal.pow(1.2, level)),
                level => new Decimal(1).add(Decimal.max(0, game.alephLayer.aleph).add(1).log10().mul(level).mul(0.05)).pow(2.5).pow(level.div(50).add(1))),
            deltaBoost: new AlephUpgrade("Gain more &delta;",
                level => Decimal.pow(10, level).mul(10).times(Decimal.pow(10, D(level.add(1)).times(level).div(2))),
                level => Decimal.pow(10, level), {
                }),
            powerGenerators: new AlephUpgrade("All Power Generators on every Layer are stronger",
                level => Utils.createValueDilation(Decimal.pow(1e5, Decimal.pow(level, 1.5)).mul(1e20), 0.001),
                level => Decimal.pow(1.5, level)),
            prestigeNoPowerBoost: new AlephUpgrade("Increase Prestige Reward on all Layers that don't have Power Generators",
                level => Decimal.pow(1e8, level).mul(1e22),
                level => Decimal.pow(2, level).min(1e3), {
                    maxLevel: 10,
                }),
            alephBoost2: new AlephUpgrade("Gain more aleph based on the log(log(&alpha;)) you have",
                level => Utils.createValueDilation(Decimal.pow(1e30, level).mul(1e40), 0.01),
                level => game.layers[0] ? Decimal.pow(new Decimal(1.1).add(level.mul(0.1)), Decimal.max(0, game.layers[0].resource).add(1).log10().add(1).log10()) : new Decimal(1)),
            betterBetaFormula: new AlephUpgrade("The &beta; Prestige and Aleph Formula is better",
                level => new Decimal(1e70),
                level => new Decimal(1).add(level.mul(0.1)), {
                    maxLevel: 1,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(2, "^")
                }),
            prestigeRewards: new AlephUpgrade("Increase the Prestige Reward of all Layers",
                level => Utils.createValueDilation(Decimal.pow(1e5, level).mul(1e50), 0.005, new Decimal("1e650")),
                level => Decimal.pow(3, level), {
                    maxLevel: 10,
                }),
            layerExponentialBoost: new AlephUpgrade("Increase the exponential difference of boosts between layers and aleph effect's exponent, resulting in a large boost!",
                level => level.lt(2) ? new Decimal([1e62, 1e93][level.toNumber()]) : Decimal.dInf,
                level => [9, 10, 11][level.toNumber()], {
                    maxLevel: 2,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(0, "")
                }),
            GeneratorBoost: new AlephUpgrade("Multiply Aleph gain based on Layer 1's 8th Generator Amount",
                level => D(1e80).times(Decimal.pow(1e20, level)),
                level => (game.layers[0].generators[7].amount).add(2).log2().pow(level), {
                    maxLevel: 2,
                    getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")
                }),
            Timespeed: new AlephUpgrade("Multiply Timespeed for layers and aleph only.",
                level => D(1e100).times(Decimal.pow(1e20, level.pow(2))),
                level => level.pow(2).div(4).add(1), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")
                }),
            Dilation: new AlephUpgrade("Dilate Aleph Effect.",
                level => D(1e200).times(Decimal.pow(1e20, level.add(1))),
                level => level.div(20).add(1), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")
                }),
            BiggerSoftcap: new AlephUpgrade("Increase Aleph Effect's Softcap.",
                level => Decimal.pow(10, level.div(2).add(6).pow(3)),
                level => D("1e1000000").pow(Decimal.pow(3, level)), {
                    getEffectDisplay: effectDisplayTemplates.numberStandard(3, "")
                })
        };
    }

    getAlephGain()
    {
        let base = this.upgrades.alephGain.apply().mul(this.upgrades.alephEffect.level.pow_base(3))
        .mul(this.getAlephBoostFromLayer())
        .mul(this.upgrades.alephBoost.apply())
        .mul(this.upgrades.alephBoost2.apply())
        .mul(this.upgrades.GeneratorBoost.apply())
        return base
    }

    getAlephBoost()
    {
        let base = game.alephLayer.aleph.add(2).log2().pow(D(this.upgrades.layerExponentialBoost.apply()).add(game.restackLayer.permUpgrades.layerExponentialBoostFactor.apply()).add(game.restackLayer.permUpgrades.layerExponentialBoostFactorTime.apply()).pow(game.alephLayer.upgrades.betterBetaFormula.apply()).pow(D(game.layers.length).sub(3))).pow(this.upgrades.alephEffect.apply()).log10().pow(this.upgrades.Dilation.apply()).pow_base(10)
        if (base.gte(this.upgrades.BiggerSoftcap.apply())) base = D(this.upgrades.BiggerSoftcap.apply()).pow(base.log10().div(this.upgrades.BiggerSoftcap.apply().log10()).pow(0.1))
        return base
    }

    isUnlocked()
    {
        return game.highestLayer >= 3;
    }

    getAlephBoostFromLayer()
    {
        if(functions.maxLayerUnlocked() < 3) return new Decimal(0);
        if(game.layers[3].timesReset === 0) return new Decimal(0);
        let base = Decimal.pow(10, D(Math.max(0, D(functions.maxLayerUnlocked() - 3))).times(Math.max(0, D(functions.maxLayerUnlocked() - 2))))
        if (base.gte(1e20)) base = D(1e20).times(base.div(1e19).log10())
        return base 
    }

    maxAll()
    {
        for(const k of Object.keys(this.upgrades))
        {
            this.upgrades[k].buyMax();
        }
    }

    tick(dt)
    {
        if(this.isUnlocked())
        {
            this.aleph = this.aleph.add(this.getAlephGain().mul(dt).times(this.upgrades.Timespeed.apply()));
        }
    }

    loadFromSave(obj)
    {
        this.aleph = obj.aleph;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        }
    }
}