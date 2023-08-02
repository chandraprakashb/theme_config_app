var colorKeys = [
    {key:"primary_color",             rgb:true  },
    {key:"primary_color_icon_text",   rgb:false },
    {key:"secondary_color",           rgb:true  },
    {key:"secondary_color_icon_text", rgb:false },
    {key:"lighter_color",             rgb:true  },
]

function rgbaToHex(rgbaColor){
    // Check if the input is a valid RGBA color
    const rgbaRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+)\))?$/;
    const match     = rgbaColor.match(rgbaRegex);

    if (!match) {
        // console.error("Invalid RGBA color format");
        return null;
    }

    // Extract the color components from the match
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const a = match[4] ? parseFloat(match[4]) : 1.0;

    // Convert to hexadecimal
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");
    const hexA = Math.round(a * 255).toString(16).padStart(2, "0");

    // Create the hexadecimal color
    const hexColor = "#" + hexR + hexG + hexB + hexA;

    return hexColor.toUpperCase(); // Return the hexadecimal color in uppercase
}

function hexToRgba(hexColor, alpha = 1.0){
    // Remove the "#" symbol if present
    const hexWithoutHash = hexColor.replace("#", "");

    // Split the hex value into individual color components
    const hexR = hexWithoutHash.substring(0, 2);
    const hexG = hexWithoutHash.substring(2, 4);
    const hexB = hexWithoutHash.substring(4, 6);

    // Convert the hex color components to integers
    const r = parseInt(hexR, 16);
    const g = parseInt(hexG, 16);
    const b = parseInt(hexB, 16);

    // Validate the alpha value (between 0 and 1)
    const validAlpha = Math.max(0, Math.min(1, alpha));

    // Return the RGBA color in the "rgba(r, g, b, a)" format
    return [r,g,b,validAlpha];
}

function setInitialColors(){
    if(!localStorage.primary_color){
        localStorage.setItem("primary_color","#8e9fbc")
    }
    if(!localStorage.primary_color_icon_text){
        localStorage.setItem("primary_color_icon_text","#8e9fbc")
    }
    if(!localStorage.secondary_color){
        localStorage.setItem("secondary_color","#26335b")
    }
    if(!localStorage.secondary_color_icon_text){
        localStorage.setItem("secondary_color_icon_text","#26335b")
    }
    if(!localStorage.lighter_color){
        localStorage.setItem("lighter_color","#ff0000")
    }

}

function renderColors(){
    this.colorKeys.forEach((colorKey)=>{
        var color = localStorage.getItem(colorKey.key)
        if(colorKey.rgb){
            $("."+colorKey.key).text(color)
            $("."+colorKey.key+"_rgb").html(this.renderRGB(color))
        }else{
            var colorToggle = $("."+colorKey.key+" .toggle-button");
                switch(color){
                    case '#ffffff':
                        $(colorToggle.toArray().find( el => el.dataset.color === 'white' )).click()
                        break;
                    case '#000000':
                        $(colorToggle.toArray().find( el => el.dataset.color === 'black' )).click()
                        break;
                }
        }
    })

    $(".style-variable-wrapper").html(`
        <style>
            :root{
                --primary_color:${localStorage.getItem('primary_color')};
                --primary_color_icon_text:${localStorage.getItem('primary_color_icon_text')};
                --secondary_color:${localStorage.getItem('secondary_color')};
                --secondary_color_icon_text:${localStorage.getItem('secondary_color_icon_text')};
                --lighter_color:${localStorage.getItem('lighter_color')};
            }
        </style>
    `)
}

function renderRGB(hexcolor){
    var rgb = hexToRgba(hexcolor)
    return `<span class="red">${rgb[0]}</span>-<span class="green">${rgb[1]}</span>-<span class="blue">${rgb[2]}</span>`
}

function downloadObjectAsJson(objectToDownload, fileName) {
    const jsonString = JSON.stringify(objectToDownload, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function manageDownload (){
    var downloadObject = {};
    colorKeys.forEach((color)=>{
        downloadObject[color.key] = localStorage.getItem(color.key);
    })

    downloadObjectAsJson(downloadObject,"theme.json")
}

function facotryReset(){
    localStorage.clear();
    setInitialColors();
    renderColors();
}