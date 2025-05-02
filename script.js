window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    let btn = document.getElementById("topbtn");

    if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

function getJson(){
    let pokemon = $('#pname').val().toLowerCase()
    $.each($('p'), function(index, value) {
        $(value).remove();
    });
    $.getJSON(`https://raw.githubusercontent.com/Nurufu/nurufu.github.io/refs/heads/main/json/${pokemon}.json`)
        .done(function(json){
            populateHeader(json)
        })
        .fail(function(){
            alert(`${$('#pname').val()} not found!`)
        })
    }

function populateHeader(obj) {
    const header = document.querySelector("header");
    //Grab each spawn
    $.each(obj.spawns, function(index, value) {
        //Create paragraph element
        var p = document.createElement("p");
        p.id = "pokemon"
        //Tweak text for 'surface context'
        if(value.context == "surface") value.context = "water surface"
        //Add guaranteed elements
        p.innerHTML = `
        <h1><u>${value.id}</u></h1>
        <li><b>Context:</b> ${value.context}</li>
        <li><b>Rarity:</b> ${value.bucket}</li>
        <li><b>Weight:</b> ${value.weight}</li>
        <li><b>Biome(s):</b> ${value.condition.biomes}</li>`;
        //Base Conditions
        if(value.presets) p.innerHTML += `<li><b>Presets:</b> <a onmouseenter="test(this)">${value.presets}</a>`
        if(value.condition.minSkyLight && value.condition.maxSkyLight) p.innerHTML += `<li><b>Sky Light:</b> ${value.condition.minSkyLight} - ${value.condition.maxSkyLight}</li>`
        if(value.condition.timeRange) p.innerHTML += `<li><b>Time of day:</b> ${value.condition.timeRange}</li>`
        if(value.condition.canSeeSky) p.innerHTML += `<li><b>Can see Sky:</b> ${value.condition.canSeeSky}</li>`
        if(value.condition.neededNearbyBlocks) p.innerHTML += `<li><b>Needed Nearby Block(s):</b> ${value.condition.neededNearbyBlocks}</li>`
        if(value.condition.dimension) p.innerHTML += `<li><b>Dimension:</b> ${value.condition.dimension}`
        if(value.condition.structures) p.innerHTML += `<li><b>Structure(s):</b> ${value.condition.structures}`
        if(value.condition.minY || value.condition.maxY) {
            minY = -64
            maxY = 304
            if(value.condition.minY != undefined) minY = value.condition.minY
            if(value.condition.maxY != undefined) maxY = value.condition.maxY
            p.innerHTML += `<li><b>Y-levels:</b> ${minY} - ${maxY}`}
        if(value.condition.isRaining || !value.condition.isRaining && value.condition.isRaining != undefined) p.innerHTML += `<li><b>Raining:</b> ${value.condition.isRaining}`
        if(value.condition.isThundering || !value.condition.isThundering && value.condition.isThundering != undefined) p.innerHTML += `<li><b>Thundering:</b> ${value.condition.isThundering}`
        if(value.condition.neededBaseBlocks) p.innerHTML += `<li><b>Needed Base Blocks:</b> ${value.condition.neededBaseBlocks}`
        if(value.condition.fluid) p.innerHTML += `<li><b>Fluid:</b> ${value.condition.fluid}`
        if(value.condition.moonPhase) p.innerHTML += `<li><b>Moon Phase:</b> ${value.condition.moonPhase}`
        //Weight multipliers + conditions
        if(value.weightMultipliers){
            $.each(value.weightMultipliers, function(index, value) {
                p.innerHTML += `<h2>Weight Multiplier: ${value.multiplier}x`
                if(value.presets) p.innerHTML += `<li><b>Presets:</b> ${value.presets}`
                if(value.condition.minSkyLight && value.condition.maxSkyLight) p.innerHTML += `<li><b>Sky Light:</b> ${value.condition.minSkyLight} - ${value.condition.maxSkyLight}</li>`
                if(value.condition.biomes) p.innerHTML += `<li><b>Biome(s):</b> ${value.condition.biomes}</li>`
                if(value.condition.timeRange) p.innerHTML += `<li><b>Time of day:</b> ${value.condition.timeRange}</li>`
                if(value.condition.canSeeSky) p.innerHTML += `<li><b>Can see Sky:</b> ${value.condition.canSeeSky}</li>`
                if(value.condition.neededNearbyBlocks) p.innerHTML += `<li><b>Needed Nearby Block(s):</b> ${value.condition.neededNearbyBlocks}</li>`
                if(value.condition.dimension) p.innerHTML += `<li><b>Dimension:</b> ${value.condition.dimension}`
                if(value.condition.structures) p.innerHTML += `<li><b>Structure(s):</b> ${value.condition.structures}`
                if(value.condition.minY || value.condition.maxY) {
                    minY = -64
                    maxY = 304
                    if(value.condition.minY != undefined) minY = value.condition.minY
                    if(value.condition.maxY != undefined) maxY = value.condition.maxY
                    p.innerHTML += `<li><b>Y-levels:</b> ${minY} - ${maxY}`}
                if(value.condition.isRaining || !value.condition.isRaining && value.condition.isRaining != undefined) p.innerHTML += `<li><b>Raining:</b>: ${value.condition.isRaining}`
                if(value.condition.isThundering || !value.condition.isThundering && value.condition.isThundering != undefined) p.innerHTML += `<li><b>Thundering:</b> ${value.condition.isThundering}`
                if(value.condition.neededBaseBlocks) p.innerHTML += `<li><b>Needed Base Blocks:</b> ${value.condition.neededBaseBlocks}`
                if(value.condition.fluid) p.innerHTML += `<li><b>Fluid:</b> ${value.condition.fluid}`
                if(value.condition.moonPhase) p.innerHTML += `<li><b>Moon Phase:</b> ${value.condition.moonPhase}`
            });
        };
        //Anti conditions
        if(value.anticondition){
            p.innerHTML += `<h2>Anti Condition(s):</li><br />`;
            if(value.presets) p.innerHTML += `<li><b>Presets:</b> ${value.presets}`
            if(value.anticondition.minSkyLight && value.anticondition.maxSkyLight) p.innerHTML += `<li><b>Sky Light:</b> ${value.anticondition.minSkyLight} - ${value.anticondition.maxSkyLight}</li>`
            if(value.anticondition.biomes) p.innerHTML += `<li><b>Biome(s):</b> ${value.anticondition.biomes}</li>`
            if(value.anticondition.timeRange) p.innerHTML += `<li><b>Time of day:</b> ${value.anticondition.timeRange}</li>`
            if(value.anticondition.canSeeSky) p.innerHTML += `<li><b>Can see Sky:</b> ${value.anticondition.canSeeSky}</li>`
            if(value.anticondition.neededNearbyBlocks) p.innerHTML += `<li><b>Needed Nearby Block(s):</b> ${value.anticondition.neededNearbyBlocks}</li>`
            if(value.anticondition.dimension) p.innerHTML += `<li><b>Dimension:</b> ${value.anticondition.dimension}`
            if(value.anticondition.structures) p.innerHTML += `<li><b>Structure(s):</b> ${value.anticondition.structures}`
            if(value.anticondition.minY || value.anticondition.maxY) {
                minY = -64
                maxY = 304
                if(value.anticondition.minY != undefined) minY = value.anticondition.minY
                if(value.anticondition.maxY != undefined) maxY = value.anticondition.maxY
                p.innerHTML += `<li><b>Y-levels:</b> ${minY} - ${maxY}`}
            if(value.anticondition.isRaining) p.innerHTML += `<li><b>Raining`
            if(value.anticondition.isThundering) p.innerHTML += `<li><b>Thundering`
            if(value.anticondition.neededBaseBlocks) p.innerHTML += `<li><b>Needed Base Blocks:</b> ${value.anticondition.neededBaseBlocks}`
            if(value.anticondition.fluid) p.innerHTML += `<li><b>Fluid:</b> ${value.anticondition.fluid}`
            if(value.anticondition.moonPhase) p.innerHTML += `<li><b>Moon Phase:</b> ${value.anticondition.moonPhase}`
        }
        header.appendChild(p);
    });
}

function topScroll(){
    window.scrollTo({top:0, behavior: 'smooth'});
}

function test(a){
    console.log(a.val)
}